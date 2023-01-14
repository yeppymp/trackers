import { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { actionType } from '../../reducers/useAuthReducer';

import { authService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/auth.interface';

const useLogin = () => {
  const { authDispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (payload: ILogin) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await authService.login(payload);
      const { data: responseData } = response;

      localStorage.setItem('username', responseData.username);
      localStorage.setItem('token', responseData.token);

      authDispatch({
        type: actionType.SET_IS_LOGINED,
        username: responseData.username,
        token: responseData.token,
      });

      setIsSuccess(true);

      return responseData;
    } catch (err: any) {
      const { message } = err.response.data.error;
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return [login, isLoading, isSuccess, errorMessage] as const;
};

export default useLogin;
