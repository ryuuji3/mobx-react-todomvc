import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './TodoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoStore} = this.props;

		if (todoStore.todos.length === 0) {
			return null;
		}

		return <section className="main">
			<input
				className="toggle-all"
				id="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<label htmlFor="toggle-all"></label>
			<ul className="todo-list">
				{this.renderTodos()}
			</ul>
		</section>
	}

	renderTodos = () => {
		return this.getVisibleTodos().map((todo, key) =>
			<TodoItem
				key={key}
				todo={todo}
				viewStore={this.props.viewStore}
				tagStore={this.props.tagStore}
				todoStore={this.props.todoStore}
			/>
		);
	}

	getVisibleTodos() {
		return this.props.todoStore.todos.filter(todo => {
			switch (this.props.viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
