import { AxiosRequestConfig } from 'axios';
import { IncomingHttpHeaders } from 'http';

import HttpClient from '../libraries/HttpClient';

class SummaryService extends HttpClient {
  private static classInstance?: SummaryService;
  public static accessToken: string;
  public static requestHeaders: IncomingHttpHeaders = {};

  private constructor() {
    super(`${process.env.API_URL}/api`);

    this._initializeRequestInterceptor();
  }

  public static getInstance(): any {
    if (!this.classInstance) {
      this.classInstance = new SummaryService();
    }

    return this.classInstance;
  }

  private _handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const { accessToken, requestHeaders } = SummaryService;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (Object.keys(requestHeaders).length > 0) {
      Object.entries(requestHeaders).forEach(([key, value]) => {
        config.headers[key] = value;
      });
    }

    return config;
  };

  private _initializeRequestInterceptor = (): void => {
    this.requestInstance.interceptors.request.use(this._handleRequest);
  };

  public setAccessToken = (accessToken: string): any => {
    SummaryService.accessToken = accessToken;

    return this;
  };

  public setRequestHeaders = (headers: IncomingHttpHeaders): any => {
    SummaryService.requestHeaders = headers;

    return this;
  };

  public fetchSummary = () => this.requestInstance.get('/');

  public fetchSummaryDetail = (deviceId: string) =>
    this.requestInstance.get(`/${deviceId}`);
}

export default SummaryService;
