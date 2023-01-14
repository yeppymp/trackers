import React, { useContext, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useNavigate, useParams } from 'react-router-dom';

import { FaLongArrowAltLeft } from 'react-icons/fa';

import { AppContext } from '../context/AppContext';

import useSummaryDetail from '../hooks/useSummaryDetail';

import { Layout } from '../components/layout';
import Table, { ETableType } from '../components/utilities/Table';
import {
  SnackbarContext,
  snackbarActionType,
} from '../components/utilities/Snackbar';
import SkeletonSummary from '../components/skeleton/SkeletonSummary';

import { formatDateTime } from '../helpers/dateHelper';

const SummaryDetail: React.FC<{}> = () => {
  const { authState } = useContext(AppContext);
  const { snackbarDispatch } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const params = useParams();
  const deviceId = params.deviceId || null;

  const [fetchDetail, summary, isLoading, errorMessage] = useSummaryDetail();

  const [chartData, setChartData] = useState<any[]>();

  useEffect(() => {
    if (!authState.isLogined) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: 'You are not logged in.',
      });

      const loginRoute = { pathname: '/login' };

      navigate(loginRoute);
    }

    if (deviceId) fetchDetail(deviceId);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: 'Error while fetching summary.',
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (summary) {
      const uniqueLocations = Array.from(
        new Set(summary.map((device) => device.location)),
      );

      const chartLocationData: any[] = [['Location', 'Frequency']];

      uniqueLocations.forEach((location) => {
        const frequency = summary.filter(
          (device) => device.location === location,
        ).length;
        chartLocationData.push([location, frequency]);
      });

      setChartData(chartLocationData);
    }
  }, [summary]);

  const chartOptions = {
    title: 'Time spent on each location',
    backgroundColor: 'transparent',
    is3D: true,
    titleTextStyle: {
      color: 'white',
    },
    legend: {
      textStyle: {
        color: 'white',
      },
    },
  };

  return (
    <Layout>
      <div className="w-full lg:px-24 xl:px-48">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-white text-4xl">
            {summary[0]?.device_type} {deviceId}
          </h1>

          <button
            className="flex items-center text-white"
            onClick={() => navigate(-1)}
          >
            <FaLongArrowAltLeft />
            &nbsp;BACK
          </button>
        </div>

        <div className="flex gap-x-4 w-full flex-col lg:flex-row">
          <div className="mt-4 w-full lg:w-1/2">
            {isLoading && <SkeletonSummary count={5} />}

            {!isLoading && (
              <Table type={ETableType.BASIC}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((device) => (
                    <tr key={`device-${device.id}`}>
                      <td>{formatDateTime(device.timestamp)}</td>
                      <td>{device.location}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>

          <div className="mt-4 w-full lg:w-1/2 bg-white bg-opacity-25 backdrop-blur rounded-3xl">
            {chartData && chartData.length > 0 && (
              <Chart
                chartType="PieChart"
                data={chartData}
                options={chartOptions}
                width={'100%'}
                height={'400px'}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SummaryDetail;
