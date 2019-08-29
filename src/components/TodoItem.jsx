import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action, computed} from 'mobx';
import TodoEntry from './TodoEntry';
import Label from "./ui/Label";
import TagLabel from './TagLabel';

const ESCAPE_KEY = 27;

@observer
export default class TodoItem extends React.Component {
	render() {
		const {todo, todoStore, tagStore} = this.props;

		return (
			<li className={[
				todo.completed ? "completed": "",
				this.isBeingEdited ? "editing" : ""
			].join(" ")}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
						<small>
							{ this.renderTags() }
						</small>
					</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				{ this.isBeingEdited ? 
					<TodoEntry
						classes="edit"
						todoStore={todoStore}
						tagStore={tagStore}
						todo={todo}
						onSubmit={this.handleSubmit}
						onKeyDown={this.handleKeyDown} 
					/>
					: null 
				}
			</li>
		);
	}

	renderTags = () => {
		return this.props.todo.tags.map((id, key) => {
			const tag = this.props.tagStore.findById(id);

			return <TagLabel key={key} tag={tag} />
		})
	}

	@computed
	get isBeingEdited() {
		return this.props.viewStore.todoBeingEdited === this.props.todo
	}

	@action
	handleSubmit = todo => {
		if (!todo) {
			this.props.todo.destroy();
		}

		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleEdit = () => {
		const { todo, viewStore } = this.props;

		viewStore.todoBeingEdited = todo;
	};

	@action
	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.props.viewStore.todoBeingEdited = null;
		}
	};

	@action
	handleToggle = () => {
		this.props.todo.toggle();
	};
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};
