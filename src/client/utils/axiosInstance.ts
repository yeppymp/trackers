import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((config) => {
  let localToken: string | null = null;

  try {
    const tokenData = window.localStorage.getItem('token');

    localToken = tokenData || null;
  } catch (error) {
    console.warn('Error reading localStorage key “token”:', error);
  }

  config.headers['auth-access-token'] = localToken;

  return config;
});

export { AxiosResponse };

export default axiosInstance;
