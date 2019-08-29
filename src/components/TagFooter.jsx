import React from "react";
import { observer } from "mobx-react";
import TagList from "./TagList";

@observer
export default class TagFooter extends React.Component {
    render() {
        const { tags } = this.props.tagStore;

        return <TagList tags={tags} onDismiss={this.removeTag} />;
    }

    removeTag = ({ id }) => {
        this.props.tagStore.removeTag(id);
    }
}