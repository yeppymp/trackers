import React, { createContext } from 'react';

import useAuth, {
  initialState as authInitialState,
  InitialStateType as authInitialStateType,
} from '../reducers/useAuthReducer';

interface IAppContext {
  authState: authInitialStateType;
  authDispatch: React.Dispatch<any>;
}

const defaultContextValue = {
  authState: authInitialState,
  authDispatch: () => null,
};

const AppContext = createContext<IAppContext>(defaultContextValue);

const AppProvider = (props: { children: React.ReactNode }) => {
  const [authState, authDispatch] = useAuth();

  const contextValue = {
    authState,
    authDispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
