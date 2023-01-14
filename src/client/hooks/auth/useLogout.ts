import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { actionType } from '../../reducers/useAuthReducer';

const useLogout = () => {
  const { authDispatch } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('username');

    authDispatch({
      type: actionType.SET_IS_LOGINED,
      username: null,
      token: null,
    });
  };

  return [logout] as const;
};

export default useLogout;
