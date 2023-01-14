import axiosInstance from '../utils/axiosInstance';
import { IRegister, ILogin } from '../interfaces/auth.interface';

const register = (payload: IRegister) =>
  axiosInstance.post('/auth/register', payload);
const login = (payload: ILogin) => axiosInstance.post('/auth/login', payload);

export const authService = {
  register,
  login,
};
