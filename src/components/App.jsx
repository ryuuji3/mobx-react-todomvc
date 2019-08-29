import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import Todo from "./Todo";

import DevTool from 'mobx-react-devtools';

@observer
export default class App extends React.Component {
	render() {
		const { rootStore } = this.props;

		return (
			<div>
				<DevTool />
				<Todo rootStore={rootStore} />
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

App.propTypes = {
	rootStore: PropTypes.object.isRequired
};
