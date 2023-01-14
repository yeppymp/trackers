import { useReducer } from 'react';

export enum snackbarActionType {
  OPEN_SNACKBAR = 'open_snackbar',
  CLOSE_SNACKBAR = 'close_snackbar',
}

interface IReducerAction {
  type: snackbarActionType;
  message: string | null;
}

export type InitialStateType = {
  toggleSnackbar: boolean;
  message: string | null;
};

export const initialState: InitialStateType = {
  toggleSnackbar: false,
  message: null,
};

const reducer = (state: InitialStateType, action: IReducerAction) => {
  switch (action.type) {
    case snackbarActionType.OPEN_SNACKBAR:
      return {
        ...state,
        toggleSnackbar: true,
        message: action.message,
      };
    case snackbarActionType.CLOSE_SNACKBAR:
      return {
        ...state,
        toggleSnackbar: false,
        message: null,
      };
    default:
      return state;
  }
};

const useSnackbarReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};

export default useSnackbarReducer;
