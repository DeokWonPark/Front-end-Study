import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AppReducer from './app_reducer';
import ContextSample from './components/contextSample';

ReactDOM.render(
  <React.StrictMode>
    <AppReducer />
  </React.StrictMode>,
  document.getElementById('root')
);

