import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import './utils/i18nInstance';
import './styles/main.scss';

import App from './App';

const renderApp = () => {
  const rootContent = document.getElementById('root');

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootContent,
  );
};

loadableReady(() => {
  renderApp();
});
