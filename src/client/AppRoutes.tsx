import React from 'react';
import { useRoutes } from 'react-router-dom';
import loadable from '@loadable/component';

const Loading = () => <div>Loading...</div>;

const fallback = { fallback: <Loading /> };

const Login = loadable(() => import('./pages/auth/Login'), fallback);
const Register = loadable(() => import('./pages/auth/Register'), fallback);
const Summary = loadable(() => import('./pages/Summary'), fallback);
const SummaryDetail = loadable(() => import('./pages/SummaryDetail'), fallback);

const config = [
  {
    path: '*',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/summary',
    element: <Summary />,
  },
  {
    path: '/summary/:deviceId',
    element: <SummaryDetail />,
  },
];

const AppRoutes = () => {
  return useRoutes(config);
};

export default AppRoutes;
