import {observable} from 'mobx';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable completed;
	@observable tags = [];

	constructor(store, id, title, completed, tags = []) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.tags = tags;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}
	
	addTags(tags) {
		tags.forEach(tag => this.addTag(tag));
	}

	addTag(tag) {
		if (this.tags.findIndex(id => id === tag) === -1) {
			this.tags.push(tag);
		}
	}

	removeTag(id) {
		const found = this.tags.findIndex(tag => tag === id);

		if (found > -1) {
			this.tags.splice(found, 1);
		}
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed,
			tags: this.tags
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.completed, object.tags);
	}
}
