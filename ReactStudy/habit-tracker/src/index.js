import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import SimpleHabit from './components/simple_habit';

ReactDOM.render(
  //use strict
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 
