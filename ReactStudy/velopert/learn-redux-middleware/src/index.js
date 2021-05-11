import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const store = createStore(rootReducer,composeWithDevTools(
  applyMiddleware(ReduxThunk.withExtraArgument({history:customHistory}),logger),
));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

