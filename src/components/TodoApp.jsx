import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import TodoEntry from './TodoEntry';
import TodoOverview from './TodoOverview';
import TodoFooter from './TodoFooter';
// Temp:
import TagList from "./TagList";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

@observer
export default class TodoApp extends React.Component {
	render() {
		const { rootStore } = this.props;
		const { todos: todoStore, view: viewStore } = rootStore;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
				<TagList rootStore={rootStore} />
			</div>
		);
	}

	componentDidMount() {
		if (__CLIENT__) {
			var { Router } = require('director/build/director');
			var { view: viewStore } = this.props.rootStore;
			var router = Router({
				'/': function () { viewStore.todoFilter = ALL_TODOS; },
				'/active': function () { viewStore.todoFilter = ACTIVE_TODOS; },
				'/completed': function () { viewStore.todoFilter = COMPLETED_TODOS; }
			});
			router.init('/');
		}
	}
}

TodoApp.propTypes = {
	rootStore: PropTypes.object.isRequired
};
