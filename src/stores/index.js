import RootStore from './RootStore';
import TodoStore from './TodoStore';
import TagStore from './TagStore';

const initialState = window.initialState && JSON.parse(window.initialState) || {};

const rootStore = new RootStore();
// Domain stores
const todoStore = TodoStore.fromJS(rootStore, initialState.todos || []);
const tagStore = TagStore.fromJS(rootStore, initialState.tags || []);
// Replace existing instances
rootStore.tags = tagStore;
rootStore.todos = todoStore;

export default rootStore;