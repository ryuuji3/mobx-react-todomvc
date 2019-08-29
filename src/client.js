import 'todomvc-common';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import rootStore from "./stores";

ReactDOM.render(
  <App rootStore={rootStore} />,
  document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const App = require('./components/App').default;

    ReactDOM.render(
      <App rootStore={rootStore} />,
      document.getElementById('todoapp')
    );
  });
}

