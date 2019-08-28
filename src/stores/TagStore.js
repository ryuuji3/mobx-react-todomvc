import { observable, action, reaction } from "mobx";
import TodoModel from "../models/TodoModel";
import TagModel from "../models/TagModel";
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
            tags => window.fetch && fetch(`/api/tags`, {
                method: 'post',
                body: JSON.stringify({ tags }),
                headers: new Headers({ 'Content-Type': 'application/json' })
            })
        );
    }

    @action
    addTag(name, color) {
        this.tags.push(
            new TagModel(this, Utils.uuid(), name, color)
        );
    }

    @action
    removeTag(id) {
        const found = this.tags.findIndex(tag => tag.id === id);

        if (found > 0) {
            this.tags.splice(found, 1);
        }
    }

    toJS() {
        return this.tags.map(tag => tag.toJS());
    }

    static fromJS(rootStore, tags) {
        const store = new TagStore(rootStore);

        store.tags = tags.map(tag => TodoModel.fromJS(store, tag));

        return store;
    }
}