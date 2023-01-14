import { useState } from 'react';

import { authService } from '../../services/auth.service';
import { IRegister } from '../../interfaces/auth.interface';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async (payload: IRegister) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await authService.register(payload);
      const { response: responseData } = response.data;

      const { message } = responseData;

      setSuccessMessage(message);

      return responseData;
    } catch (err: any) {
      const { message } = err.response.data.error;
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return [register, isLoading, successMessage, errorMessage] as const;
};

export default useRegister;
