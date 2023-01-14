import React, { createContext } from 'react';

import useSnackbar, {
  initialState,
  InitialStateType,
} from '../reducers/useSnackbar.reducer';

interface ISnackbarContext {
  snackbarState: InitialStateType;
  snackbarDispatch: React.Dispatch<any>;
}

const defaultContextValue = {
  snackbarState: initialState,
  snackbarDispatch: () => null,
};

const SnackbarContext = createContext<ISnackbarContext>(defaultContextValue);

const SnackbarProvider: React.FC<{}> = (props) => {
  const [snackbarState, snackbarDispatch] = useSnackbar();

  const contextValue = {
    snackbarState,
    snackbarDispatch,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
