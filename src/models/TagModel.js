import { observable } from 'mobx';

export default class TagModel {
    store;
    id;
    @observable name;
    @observable color;

    constructor(store, id, name, color) {
        this.store = store;
        this.id = id;
        this.name = name;

        if (!color) {
            color = 'red';
        }
        
        this.color = color;
    }

    rename(name) {
        this.name = name;
    }

    changeColor(color) {
        this.color = color;
    }

    destroy() {
        this.store.tags.remove(this);
    }

    toJS() {
        return {
            id: this.id,
            name: this.name,
            color: this.color
        };
    }

    static fromJS(store, { id, name, color }) {
        return new TagModel(store, id, name, color);
    }
}