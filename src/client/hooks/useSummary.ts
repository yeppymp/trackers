import { useState } from 'react';

import { summaryService } from '../services/summary.service';
import { ISummaryList } from '../interfaces/summary.interface';

const useSummary = () => {
  const [data, setData] = useState<ISummaryList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await summaryService.fetchSummary();
      const { data: responseData } = response;

      const result: ISummaryList = responseData;

      // removing duplicates deviceId
      const uniqueResults = Array.from(
        new Map(result.map((item) => [item['device_id'], item])).values(),
      );

      setData(uniqueResults);

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

export default useSummary;
