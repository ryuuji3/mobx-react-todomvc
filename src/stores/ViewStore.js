import { observable, computed, action } from 'mobx';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

export default class ViewStore {
	rootStore;
	@observable todoBeingEdited = null;
	@observable todoFilter = ALL_TODOS;
	@observable tagFilter = null;
	@observable tagBeingRenamed = null;

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed
	get visibleTodos() {
		return this.rootStore.todos.todos.filter(todo => {
			const tagMatch = this.tagFilter ? todo.tags.findIndex(tag => tag === this.tagFilter) > -1 : true;
			
			if (tagMatch) {
				switch (this.todoFilter) {
					case ACTIVE_TODOS:
						return !todo.completed;
					case COMPLETED_TODOS:
						return todo.completed;
					default:
						return true;
				}
			}
		})
	}

	@computed
	get visibleTags() {
		return this.rootStore.todos.todos.reduce((visible, todo) => {
			if (todo.tags.length) {
				todo.tags.forEach(id => {
					if (!visible.find(tag => tag.id === id)) {
						visible.push(this.rootStore.tags.findById(id));
					}
				})
			}

			return visible;
		}, []);
	}

	@action
	removeTag(id) {
		if (this.tagFilter === id) {
			this.tagFilter = null;
		}
	}
}