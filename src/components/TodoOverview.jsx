import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import TodoItem from './TodoItem';
import { computed } from 'mobx';

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
				{this.renderTodos}
			</ul>
		</section>
	}

	@computed
	get renderTodos () {
		return this.visibleTodos.map((todo, key) =>
			<TodoItem
				key={key}
				todo={todo}
				viewStore={this.props.viewStore}
				tagStore={this.props.tagStore}
				todoStore={this.props.todoStore}
			/>
		);
	}

	@computed
	get visibleTodos() {
		return this.props.viewStore.visibleTodos;
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
