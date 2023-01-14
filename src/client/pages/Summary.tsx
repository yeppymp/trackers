import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaLongArrowAltRight,
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from 'react-icons/fa';

import { AppContext } from '../context/AppContext';

import useSummary from '../hooks/useSummary';

import { Layout } from '../components/layout';
import Table, { ETableType } from '../components/utilities/Table';
import {
  SnackbarContext,
  snackbarActionType,
} from '../components/utilities/Snackbar';
import SkeletonSummary from '../components/skeleton/SkeletonSummary';

import { ISummaryList } from '../interfaces/summary.interface';

import { formatDateTime } from '../helpers/dateHelper';

enum ESortBy {
  ID = 'id',
  DEVICE_ID = 'device_id',
  DEVICE_TYPE = 'device_type',
  TIMESTAMP = 'timestamp',
  LOCATION = 'location',
}

enum ESortType {
  ASC = 'asc',
  DESC = 'desc',
}

const Summary: React.FC<{}> = () => {
  const { authState } = useContext(AppContext);
  const { snackbarDispatch } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const [fetchSummary, summary, isLoading, errorMessage] = useSummary();

  const pageLimit = 5;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    Math.ceil(summary.length / pageLimit),
  );

  const [filteredSummary, setFilteredSummary] = useState<ISummaryList>(summary);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [sortBy, setSortBy] = useState<ESortBy>(ESortBy.TIMESTAMP);
  const [sortType, setSortType] = useState<ESortType>(ESortType.DESC);

  const searchSummary = () => {
    const result = summary.filter((device) => {
      const deviceId = device.device_id.toLowerCase();
      const deviceType = device.device_type.toLowerCase();

      return (
        deviceId.includes(searchKeyword.toLocaleLowerCase()) ||
        deviceType.includes(searchKeyword.toLocaleLowerCase())
      );
    });

    if (result.length > 0) paginateSummary(result);
    else setFilteredSummary([]);
  };

  const applySortBy = (field: ESortBy) => {
    setSortBy(field);
    setSortType(sortType === ESortType.ASC ? ESortType.DESC : ESortType.ASC);
  };

  const sortSummary = (data: ISummaryList) => {
    if (data.length < 1) return;

    let result = data.sort((a: any, b: any) =>
      String(a[sortBy]).localeCompare(b[sortBy]),
    );

    if (sortType === ESortType.DESC) {
      result = data.sort((a: any, b: any) =>
        String(b[sortBy]).localeCompare(a[sortBy]),
      );
    }

    setFilteredSummary(result);
  };

  const paginateSummary = (data: ISummaryList) => {
    if (data.length < 1) return;

    setPageCount(Math.ceil(data.length / pageLimit));

    const result = data.filter((_, i) => {
      const prevRange = (page - 1) * pageLimit;
      const nextRange = page * pageLimit;
      const index = i + 1;

      return index > prevRange && index <= nextRange;
    });

    sortSummary(result);
  };

  const resetSearch = () => {
    setSearchKeyword('');
  };

  const onTableSearch = (keyword: string) => setSearchKeyword(keyword);

  const onPaginatePrev = () => {
    const prevPage = page - 1;

    if (prevPage >= 1) setPage(prevPage);
  };

  const onPaginateNext = () => {
    const nextPage = page + 1;

    if (nextPage < pageCount) setPage(nextPage);
  };

  const handleGoToSummaryDetail = (deviceId: string) => {
    const detailRoute = { pathname: `/summary/${deviceId}` };

    navigate(detailRoute);
  };

  useEffect(() => {
    if (!authState.isLogined) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: 'You are not logged in.',
      });

      const loginRoute = { pathname: '/login' };

      navigate(loginRoute);
    }

    fetchSummary();
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
    if (summary.length > 0) paginateSummary(summary);
  }, [summary]);

  useEffect(() => {
    if (searchKeyword) searchSummary();
    else paginateSummary(summary);
  }, [searchKeyword]);

  useEffect(() => {
    if (searchKeyword) searchSummary();
    else paginateSummary(summary);
  }, [page]);

  useEffect(() => {
    sortSummary(filteredSummary);
  }, [sortBy, sortType]);

  const tableHeads = [
    {
      title: 'Device Id',
      field: ESortBy.DEVICE_ID,
    },
    {
      title: 'Device Type',
      field: ESortBy.DEVICE_TYPE,
    },
    {
      title: 'Latest Timestamp',
      field: ESortBy.TIMESTAMP,
    },
    {
      title: 'Latest Location',
      field: ESortBy.LOCATION,
    },
  ];

  return (
    <Layout>
      <h1 className="font-bold text-white text-4xl">GPS Summary</h1>
      <div className="mt-4 w-full lg:px-32 xl:px-64">
        {isLoading && <SkeletonSummary count={5} />}

        {!isLoading && (
          <Table
            type={ETableType.COMPLETE}
            onSearch={onTableSearch}
            resetSearch={resetSearch}
            onPaginatePrev={onPaginatePrev}
            onPaginateNext={onPaginateNext}
            page={page}
            perPage={pageLimit}
            total={pageCount}
          >
            <thead>
              <tr>
                {tableHeads.map((field) => (
                  <th
                    key={`thead-${field.field}`}
                    onClick={() => applySortBy(field.field)}
                  >
                    {field.title} {sortBy !== field.field && <FaSort />}
                    {sortBy === field.field && sortType === ESortType.ASC && (
                      <FaSortAlphaUp />
                    )}
                    {sortBy === field.field && sortType === ESortType.DESC && (
                      <FaSortAlphaDown />
                    )}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredSummary.map((device) => (
                <tr
                  key={`device-${device.id}`}
                  title="Show Details"
                  onClick={() => handleGoToSummaryDetail(device.device_id)}
                >
                  <td>{device.device_id}</td>
                  <td>{device.device_type}</td>
                  <td>{formatDateTime(device.timestamp)}</td>
                  <td>{device.location}</td>
                  <td className="action">
                    <button>
                      <FaLongArrowAltRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!filteredSummary ||
          (filteredSummary.length < 1 && (
            <p className="text-white text-center mt-2">
              No maching summary like &quot;{searchKeyword}&quot;
            </p>
          ))}
      </div>
    </Layout>
  );
};

export default Summary;
