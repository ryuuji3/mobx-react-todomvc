import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import InputField from "./InputField";

@observer
export default class TodoEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			value: "",
			tags: []
		};
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

	onEnter = value => {
		this.props.todoStore.addTodo(value, this.state.tags);

		this.setState({
			value: "",
			tags: []
		});
	};

	onInput = value => {
		this.note = value;

		const annotationExp = /@[\w]{1,}\s$/;
		const annotations = value.match(annotationExp); // "@[tag] "

		if (annotations && annotations.length) {
			const tag = this.props.tagStore.addTag(annotations[0].substring(1).trim());
			this.note = value.replace(annotationExp, "").trim(); // remove annotations

			this.addTag(tag);
		}
	}

	set note(value) {
		this.setState({
			value
		});
	}

	addTag = ({ id }) => {
		if (this.state.tags.findIndex(tag => tag.id === id) === -1) {
			this.setState({
				tags: [...this.state.tags, id]
			});
		}
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};
