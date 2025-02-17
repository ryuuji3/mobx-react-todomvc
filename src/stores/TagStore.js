import { observable, action, reaction } from 'mobx';
import TagModel from '../models/TagModel';
import * as Utils from '../utils';

export default class TagStore {
    rootStore;
    @observable tags = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    subscribeServerToStore() {
        reaction(
            () => this.toJS(),
            tags => window.fetch && fetch('/api/tags', {
                method: 'post',
                body: JSON.stringify({ tags }),
                headers: new Headers({ 'Content-Type': 'application/json' })
            })
        );
    }

    find(exactMatch) {
        return this.tags.find(tag => tag.name === exactMatch);
    }

    findById(id) {
        return this.tags.find(tag => tag.id === id);
    }

    @action
    addTag(name, color) {
        const existing = this.find(name);

        if (existing) {
            return existing;
        }

        const tag = new TagModel(this, Utils.uuid(), name, color)

        this.tags.push(tag);

        return tag;
    }

    @action
    removeTag(id) {
        const found = this.tags.findIndex(tag => tag.id === id);

        if (found > -1) {
            const { id } = this.tags[found]; // get ID before deleting

            this.tags.splice(found, 1);
            this.rootStore.todos.removeTag(id); // remove from existing todos
            this.rootStore.view.removeTag(id); // remove filter of old tag
        }
    }

    toJS() {
        return this.tags.map(tag => tag.toJS());
    }

    static fromJS(rootStore, tags) {
        const store = new TagStore(rootStore);

        store.tags = tags.map(tag => TagModel.fromJS(store, tag));

        return store;
    }
}