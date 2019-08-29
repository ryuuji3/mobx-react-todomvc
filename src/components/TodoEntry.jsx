import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import InputField from "./InputField";

@observer
export default class TodoEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = { value: "" };
	}

	render() {
		return <div>
			<InputField 
				value={this.state.value}
				classes="new-todo" 
				placeholder="What needs to be done?" 
				onEnter={this.onEnter}
				onInput={this.onInput}
			/>
		</div>
	}

	@action
	onEnter = value => {
		this.props.todoStore.addTodo(value);
	};

	onInput = value => {
		this.setState({
			value
		});

		const annotationExp = /@[\w]{1,}\s$/;
		const annotations = value.match(annotationExp); // "@[tag] "

		if (annotations && annotations.length) {
			const tag = annotations[0].substring(1).trim();
			const note = value.replace(annotationExp, "").trim(); // remove annotations

			this.setState({
				value: note
			});

			this.props.tagStore.addTag(tag);
		}
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};
