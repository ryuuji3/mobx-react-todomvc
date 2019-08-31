import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import Todo from './Todo';
import './App.css';

@observer
class App extends React.Component {
	render() {
		const { rootStore } = this.props;

		return (
			<div>
				<div>
					<section>
						<Todo rootStore={rootStore} />
					</section>
				</div>
				<footer className="info">
					<p>Double-click to edit a todo. Tag a todo by typing @ followed by your tag and a space.</p>
					<p>TodoMVC powered by React and <a href="http://github.com/mobxjs/mobx/">MobX</a>. Created by <a href="http://github.com/mweststrate/">mweststrate</a></p>
					<p>Based on the base React TodoMVC by <a href="http://github.com/petehunt/">petehunt</a></p>
					<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
				</footer>
			</div>
		);
	}

	componentDidMount() {
		//eslint-disable-next-line no-undef
		if (__CLIENT__) {
			const { Router } = require('director/build/director');
			const { view: viewStore } = this.props.rootStore;
			const router = Router({
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

export default App;
