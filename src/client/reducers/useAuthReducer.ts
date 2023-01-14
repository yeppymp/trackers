import { useReducer } from 'react';

const localUsername = localStorage.getItem('username');
const localToken = localStorage.getItem('token');

export enum actionType {
  SET_IS_LOGINED = 'set_is_logined',
}

interface IReducerAction {
  type: actionType;
  username: string;
  token: string;
}

export type InitialStateType = {
  isLogined: boolean;
  username: string | null;
  token: string | null;
};

export const initialState: InitialStateType = {
  isLogined: Boolean(localUsername),
  username: localUsername || null,
  token: localToken || null,
};

const reducer = (state: InitialStateType, action: IReducerAction) => {
  switch (action.type) {
    case actionType.SET_IS_LOGINED:
      return {
        ...state,
        isLogined: Boolean(action.username),
        username: action.username,
        token: action.token,
      };
    default:
      return state;
  }
};

const useAuthReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};

export default useAuthReducer;
