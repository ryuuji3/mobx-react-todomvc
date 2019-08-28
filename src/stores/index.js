import RootStore from "./RootStore";
import TodoStore from "./TodoStore";
import TagStore from "./TagStore";

const initialState = window.initialState && JSON.parse(window.initialState) || {};
const sampleTags = [
    {
        name: "White",
        color: "white"
    },
    {
        name: "Red",
        color: "red"
    },
    {
        name: "Orange",
        color: "orange"
    },
    {
        name: "Green",
        color: "green"
    },
    {
        name: "Blue",
        color: "blue"
    },
    {
        name: "Purple",
        color: "violet"
    },
    {
        name: "Black",
        color: "black"
    }
];

initialState.tags = sampleTags;

const rootStore = new RootStore();
// Domain stores
const todoStore = TodoStore.fromJS(rootStore, initialState.todos || []);
const tagStore = TagStore.fromJS(rootStore, initialState.tags || []);
// Replace existing instances
rootStore.tags = tagStore;
rootStore.todos = todoStore;

export default rootStore;