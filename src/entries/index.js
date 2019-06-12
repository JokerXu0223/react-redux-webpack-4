/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { injectGlobal } from 'styled-components';
import { isDev } from 'config';
import history from 'utils/history';
import store from 'reduxs/store';
import router from '../router';

// mock
import mock from '../mock';

if (isDev) {
  mock.start();
}

/* eslint-disable no-unused-expressions */
injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
  ol, ul {
    list-style: none;
    list-style-type: none;
  }
  a:focus {
    text-decoration: none;
  }
`;

function renderApp(Router) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(router);

if (module.hot) {
  module.hot.accept('../router.js', () => {
    const Router = require('../router.js').default;
    renderApp(Router);
  });
}