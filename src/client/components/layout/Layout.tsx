import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import { Snackbar } from '../utilities/Snackbar';

const background = require('../../assets/images/bg.jpg');

const Wrapper = styled.div`
  background: url(${background}) 0 0 no-repeat fixed;
  background-color: #f00707;
  background-blend-mode: darken;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const Card = styled.div`
  border-radius: 75px;
  margin-bottom: 2rem;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Layout: React.FC<{}> = (props) => {
  const location = useLocation();

  const showHeader = !location.pathname.includes('login' || 'register');

  return (
    <Wrapper>
      {showHeader && <Header />}

      <Container>
        <Card>{props.children}</Card>
      </Container>

      <Snackbar />
    </Wrapper>
  );
};

export default Layout;
