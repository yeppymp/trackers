import axiosInstance from '../utils/axiosInstance';

const fetchSummary = () => axiosInstance.get('/summary');
const fetchSummaryDetail = (deviceId: string) =>
  axiosInstance.get(`/summary/${deviceId}`);

export const summaryService = {
  fetchSummary,
  fetchSummaryDetail,
};
