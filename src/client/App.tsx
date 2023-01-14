import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './AppRoutes';

import { AppProvider } from './context/AppContext';
import { SnackbarProvider } from './components/utilities/Snackbar/context/SnackbarContext';

const App: React.FC<{}> = () => (
  <AppProvider>
    <SnackbarProvider>
      <Router>
        <AppRoutes />
      </Router>
    </SnackbarProvider>
  </AppProvider>
);

export default App;
