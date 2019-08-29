import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import InputField from "./InputField";
import { observable, action } from 'mobx';

@observer
export default class TodoEntry extends React.Component {
	@observable note = "";
	@observable tags = [];

	render() {
		return <div>
			<InputField 
				value={this.note}
				classes="new-todo" 
				placeholder="What needs to be done?" 
				onEnter={this.onEnter}
				onInput={this.onInput}
			/>
		</div>
	}

	@action
	onEnter = value => {
		const { todoStore, tag } = this.props;

		if (tag) {
			// edit
		} else {
			todoStore.addTodo(value, this.tags);
		}

		this.note = "";
		this.tags = [];
	};

	@action
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

	@action
	addTag = ({ id }) => {
		if (this.tags.findIndex(tag => tag.id === id) === -1) {
			this.tags.push(id);
		}
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired,
	tag: PropTypes.object
};
