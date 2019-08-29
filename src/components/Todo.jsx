import React from "react";
import TodoEntry from './TodoEntry';
import TodoOverview from './TodoOverview';
import TodoFooter from './TodoFooter';
import { observer } from "mobx-react";
import TagList from "./TagList";

@observer
export default class Todo extends React.Component {
    render() {
        const { rootStore } = this.props;
        const { todos: todoStore, view: viewStore, tags: tagStore } = rootStore;
        
        return <div>
            <header className="header">
                <h1>todos</h1>
                <TodoEntry todoStore={todoStore} tagStore={tagStore} />
            </header>
            <div>
                <TodoOverview todoStore={todoStore} viewStore={viewStore} />
                <TodoFooter todoStore={todoStore} viewStore={viewStore} />
                <TagList tagStore={tagStore} />
            </div>
        </div>
    }
}