import 'todomvc-common';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import rootStore from "./stores";

ReactDOM.render(
  <TodoApp rootStore={rootStore} />,
  document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./components/todoApp', () => {
    var NewTodoApp = require('./components/todoApp').default;

    ReactDOM.render(
      <NewTodoApp rootStore={rootStore} />,
      document.getElementById('todoapp')
    );
  });
}

