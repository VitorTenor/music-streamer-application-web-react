import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from './services/history';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer autoClose={2500} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
