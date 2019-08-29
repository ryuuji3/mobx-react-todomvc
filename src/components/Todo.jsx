import React from "react";
import TodoEntry from './TodoEntry';
import TodoOverview from './TodoOverview';
import TodoFooter from './TodoFooter';
import { observer } from "mobx-react";
import TagFooter from "./TagFooter";

@observer
export default class Todo extends React.Component {
    render() {
        const { rootStore } = this.props;
        const { todos: todoStore, view: viewStore, tags: tagStore } = rootStore;

        return <div>
            <div className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <TodoEntry todoStore={todoStore} tagStore={tagStore} classes="new-todo" />
                </header>
                <div>
                    <TodoOverview todoStore={todoStore} tagStore={tagStore} viewStore={viewStore} />
                    <TodoFooter todoStore={todoStore} viewStore={viewStore} />
                </div>
            </div>
            <div>
                <TagFooter tagStore={tagStore} viewStore={viewStore} />
            </div>
        </div>
    }
}