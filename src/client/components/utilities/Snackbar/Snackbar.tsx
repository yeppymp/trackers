import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { SnackbarContext } from './context/SnackbarContext';
import { snackbarActionType } from './reducers/useSnackbar.reducer';

interface ISnackbar {
  timeout?: number;
}

const animateFadeIn = () => keyframes`
  from { bottom: 0; opacity: 0 }
  to { bottom: 30px; opacity: 1 }
`;

const animateFadeOut = () => keyframes`
  from { bottom: 30px; opacity: 1 }
  to { bottom: 0; opacity: 0 }
`;

const SnackbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  z-index: 1;
  width: 100%;
`;

const SnackbarContainer = styled.div.attrs((props: ISnackbar) => ({
  time: (props.timeout || 3000) / 1000,
}))<ISnackbar>`
  min-width: 250px;
  background-color: white;
  color: #333;
  text-align: center;
  padding: 10px 24px;
  font-size: 1rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  -webkit-animation: ${animateFadeIn} 0.5s,
    ${animateFadeOut} 0.5s ${(props) => props.time}s;
  animation: ${animateFadeIn} 0.5s,
    ${animateFadeOut} 0.5s ${(props) => props.time}s;
`;

const Snackbar: React.FC<ISnackbar> = (props) => {
  const { snackbarState, snackbarDispatch } = useContext(SnackbarContext);

  const show = snackbarState.toggleSnackbar;
  const message = snackbarState.message;
  const timeout = props.timeout || 3000;

  const closeSnackbar = () => {
    snackbarDispatch({
      type: snackbarActionType.CLOSE_SNACKBAR,
      message: null,
    });
  };

  useEffect(() => {
    if (show) setTimeout(() => closeSnackbar(), timeout);
  }, [show]);

  if (!show) return null;

  return (
    <SnackbarWrapper>
      <SnackbarContainer timeout={timeout}>{message}</SnackbarContainer>
    </SnackbarWrapper>
  );
};

export default Snackbar;
