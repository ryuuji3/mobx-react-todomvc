import { observable, computed, reaction, action } from 'mobx';
import TodoModel from '../models/TodoModel'
import * as Utils from '../utils';


export default class TodoStore {
	rootStore;
	@observable todos = [];

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			todos => window.fetch && fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

	@action
	addTodo(title, tags = []) {
		this.todos.push(new TodoModel(this, Utils.uuid(), title, false, tags));
	}

	@action
	toggleAll(checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	@action
	clearCompleted() {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}

	@action
	removeTag(id) {
		this.todos.forEach(todo => {
			const found = todo.tags.findIndex(tag => tag === id);

			if (found > -1) {
				todo.tags.splice(found, 1);
			}
		})
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static fromJS(rootStore, array) {
		const todoStore = new TodoStore(rootStore);

		todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));

		return todoStore;
	}
}
