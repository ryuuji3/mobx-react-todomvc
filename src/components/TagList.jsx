import React from "react";
import PropTypes from 'prop-types';
import Tag from "./Tag";
import { observer } from "mobx-react";

@observer
export default class TagList extends React.Component {
    render() {
        const list = this.renderList(this.props.tags);

        return <div className="TagList">
            {list}
        </div>
    }

    renderList(tags) {
        return tags.map((tag, key) => <Tag onDismiss={this.onDismiss} tag={tag} key={key} />)
    }

    onDismiss = tag => {
        if (this.props.onDismiss) {
            this.props.onDismiss(tag);
        }
    }
}

TagList.propTypes = {
    tags: PropTypes.object.isRequired,
    onDismiss: PropTypes.func
};