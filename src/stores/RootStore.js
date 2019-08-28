import TodoStore from "./TodoStore";
import TagStore from "./TagStore";
import ViewStore from "./ViewStore";

export default class RootStore {
    constructor() {
        // Domain stores
        this.todos = new TodoStore(this);
        this.tags = new TagStore(this);
        // View stores
        this.view = new ViewStore(this);
    }
}