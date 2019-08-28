import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';

const ENTER_KEY = 13;

@observer
export default class InputField extends React.Component {
	render() {
		const { classes, placeholder } = this.props;

		return <input
			ref="newField"
			className={classes}
			placeholder={placeholder}
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>;
	}

	@action
	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.onInput(val); // Submit value to parent component
			ReactDOM.findDOMNode(this.refs.newField).value = ''; // Reset value
		}
	};
}

InputField.propTypes = {
	classes: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	onInput: PropTypes.func.isRequired
};
