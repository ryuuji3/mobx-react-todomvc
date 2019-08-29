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
            onDismiss={this.onDismiss}
            dismissable
        />;
    }

    @action
    onDismiss = () => {
        this.props.store.removeTag(this.props.tag.id);
    }
}