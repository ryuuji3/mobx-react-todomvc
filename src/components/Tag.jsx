import React from "react";
import Button from "./ui/Button";
import { observer } from "mobx-react";
import { action } from "mobx";

@observer
export default class Tag extends React.Component {
    render() {
        const { tag } = this.props;

        return <Button
            text={tag.name}
            color={tag.color}
            onClick={this.onClick.bind(this)}
            onDismiss={this.onDismiss.bind(this)}
            dismissable
        />;
    }

    @action
    onDismiss(e) {
        e.preventDefault();
    }

    @action
    onClick(e) {
        e.preventDefault();
    }
}