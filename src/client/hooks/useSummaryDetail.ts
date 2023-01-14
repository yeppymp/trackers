import { useState } from 'react';

import { summaryService } from '../services/summary.service';
import { ISummaryList } from '../interfaces/summary.interface';

const useSummaryDetail = () => {
  const [data, setData] = useState<ISummaryList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSummary = async (deviceId: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await summaryService.fetchSummaryDetail(deviceId);
      const { data: responseData } = response;

      const result: ISummaryList = responseData;

      setData(result);

      return responseData;
    } catch (err: any) {
      let message = err.response.data;

      if (err.response.data.error && err.response.data.error.message) {
        message = err.response.data.error;
      }

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchSummary, data, isLoading, errorMessage] as const;
};

export default useSummaryDetail;
