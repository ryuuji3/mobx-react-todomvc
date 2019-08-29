import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';

const ENTER_KEY = 13;

@observer
export default class InputField extends React.Component {
	render() {
		const { classes, placeholder, value } = this.props;

		return <input
			value={value}
			ref="newField"
			className={classes}
			placeholder={placeholder}
			onKeyDown={this.handleKeyDown}
			onFocus={this.handleFocus}
			onChange={this.handleInput}
			autoFocus={true}
		/>;
	}

	handleKeyDown = event => {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}

		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.onEnter(val); // Submit value to parent component
			ReactDOM.findDOMNode(this.refs.newField).value = ''; // Reset value
		}
	};

	handleInput = event => {
		if (this.props.onInput) {
			this.props.onInput(event.target.value);
		}
	}

	handleFocus = event => {
		if (this.props.onFocus) {
			this.props.onFocus(event); // Broadcast when focused 
		}
	}
}

InputField.propTypes = {
	value: PropTypes.string,
	classes: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	onEnter: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func,
	onInput: PropTypes.func,
};
