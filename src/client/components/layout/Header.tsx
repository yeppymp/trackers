import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IconContext } from 'react-icons';
import { FaSignOutAlt } from 'react-icons/fa';

import useLogout from '../../hooks/auth/useLogout';

import Button, { ButtonColor, ButtonVariant } from '../utilities/Button';

const Header = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 8rem;

  @media screen and (max-width: 1024px) {
    padding: 1rem 2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const Layout: React.FC<{}> = () => {
  const [doLogout] = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();

    const loginRoute = { pathname: '/login' };

    navigate(loginRoute);
  };

  return (
    <Header>
      <h1 className="font-bold text-white text-2xl">
        Trackers
        <span className="text-primary">.</span>
      </h1>

      <Button
        color={ButtonColor.OUTLINE_PRIMARY}
        variant={ButtonVariant.ROUNDED}
        customClasses="flex items-center"
        onClick={handleLogout}
      >
        <IconContext.Provider value={{ color: 'primary' }}>
          <FaSignOutAlt />
        </IconContext.Provider>
        &nbsp; Logout
      </Button>
    </Header>
  );
};

export default Layout;
