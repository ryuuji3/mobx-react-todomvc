import 'todomvc-common';
import TodoApp from './components/TodoApp';
import React from 'react';
import ReactDOM from 'react-dom';
import rootStore from "./stores";

ReactDOM.render(
  <TodoApp rootStore={rootStore} />,
  document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./components/TodoApp', () => {
    var NewTodoApp = require('./components/TodoApp').default;

    ReactDOM.render(
      <NewTodoApp rootStore={rootStore} />,
      document.getElementById('todoapp')
    );
  });
}

