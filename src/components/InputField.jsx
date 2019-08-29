import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

const ENTER_KEY = 13;

@observer 
class InputField extends React.Component {
	render() {
		const { classes, placeholder, value } = this.props;

		return <input
			value={value}
			className={classes}
			placeholder={placeholder}
			onKeyDown={this.handleKeyDown}
			onFocus={this.handleFocus}
			onChange={this.handleInput}
			onBlur={this.handleBlur}
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

		const val = this.props.value.trim();

		if (val) {
			this.props.onEnter(val); // Submit value to parent component
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

	handleBlur = event => {
		if (this.props.onBlur) {
			this.props.onBlur(event);
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
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

export default InputField;