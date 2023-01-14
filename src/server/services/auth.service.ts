import { AxiosRequestConfig } from 'axios';
import { IncomingHttpHeaders } from 'http';

import HttpClient from '../libraries/HttpClient';

import { IRegister } from '../interfaces/auth.interface';

class AuthService extends HttpClient {
  private static classInstance?: AuthService;
  public static accessToken: string;
  public static requestHeaders: IncomingHttpHeaders = {};

  private constructor() {
    super(`${process.env.API_URL}/api`);

    this._initializeRequestInterceptor();
  }

  public static getInstance(): any {
    if (!this.classInstance) {
      this.classInstance = new AuthService();
    }

    return this.classInstance;
  }

  private _handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const { accessToken, requestHeaders } = AuthService;

    if (accessToken) {
      config.headers['Authorization'] = `Basic ${accessToken}`;
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
    AuthService.accessToken = accessToken;

    return this;
  };

  public setRequestHeaders = (headers: IncomingHttpHeaders): any => {
    AuthService.requestHeaders = headers;

    return this;
  };

  public register = (payload: IRegister) => {
    return this.requestInstance.post('/signup', payload);
  };

  public login = () => {
    return this.requestInstance.post('/login', {});
  };
}

export default AuthService;
