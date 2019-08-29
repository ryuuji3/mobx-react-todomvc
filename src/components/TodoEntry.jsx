import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import InputField from "./InputField";
import { observable, action, computed } from 'mobx';
import TagList from "./TagList";
import "./TodoEntry.css";

@observer
export default class TodoEntry extends React.Component {
	@observable title = "";
	@observable tags = [];

	constructor(props) {
		super(props);

		const { todo } = this.props;

		this.reset(todo);
	}

	render() {
		const { classes, onKeyDown } = this.props;

		return <div className="TodoEntry">
			<InputField 
				value={this.title}
				classes={classes} 
				placeholder="What needs to be done?" 
				onEnter={this.onEnter}
				onInput={this.onInput}
				onKeyDown={onKeyDown}
			/>
			<TagList classes="note-tag-list" tags={this.loadedTags} onDismiss={this.removeTagFromTodo} />
		</div>
	}

	@action
	onEnter = value => {
		const { todoStore, todo: existing, onSubmit } = this.props;
		const trimmed = value.trim();
		let todo = existing || null;

		if (todo) {
			if (trimmed) {
				todo.setTitle(value);
				todo.addTags(this.tags);
			} else {
				todo = null;
			}

			if (onSubmit) {
				onSubmit(todo);
			}

			this.reset(todo);
		} else {
			todo = todoStore.addTodo(value, this.tags);

			if (onSubmit) {
				onSubmit(todo);
			}

			this.reset();
		}
	};

	@action
	onInput = value => {
		this.title = value;

		const annotationExp = /@[\w]{1,}\s$/;
		const annotations = value.match(annotationExp); // "@[tag] "

		if (annotations && annotations.length) {
			const tag = this.props.tagStore.addTag(annotations[0].substring(1).trim());
			
			this.title = value.replace(annotationExp, "").trim(); // remove annotations
			this.addTag(tag);
		}
	}

	@action
	addTag = ({ id }) => {
		if (this.tags.findIndex(tag => tag.id === id) === -1) {
			this.tags.push(id);
		}
	}

	@action
	reset = ({ title = "", tags = []} = {}) => {
		this.title = title;
		this.tags = tags;
	}

	@action
	removeTagFromTodo = tag => {
		const { todo } = this.props;

		if (todo) {
			this.props.todo.removeTag(tag.id);
		} else {
			const found = this.tags.findIndex(id => id === tag.id);

			if (found > -1) {
				this.tags.splice(found, 1);
			}
		}
	};

	@computed
	get loadedTags() {
		return this.tags.map(id => this.props.tagStore.findById(id));
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired,
	todo: PropTypes.object,
	classes: PropTypes.string,
	onSubmit: PropTypes.func,
	onKeyDown: PropTypes.func
};
