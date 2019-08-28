import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import InputField from "./InputField";

@observer
export default class TodoEntry extends React.Component {
	render() {
		return <InputField 
			classes="new-todo" 
			placeholder="What needs to be done?" 
			onInput={this.onInput} 
		/>
	}

	@action
	onInput = (value) => {
		this.props.todoStore.addTodo(value);
	};
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};
