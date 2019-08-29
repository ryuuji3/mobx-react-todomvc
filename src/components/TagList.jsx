import React from "react";
import PropTypes from 'prop-types';
import Tag from "./Tag";
import { observer } from "mobx-react";

@observer
export default class TagList extends React.Component {
    render() {
        const list = this.renderList(this.props);

        return <div className="TagList">
            {list}
        </div>
    }

    renderList({ tags, activeTag = null }) {
        return tags.map((tag, key) => <Tag onDismiss={this.onDismiss} onClick={this.onClick} tag={tag} key={key} active={activeTag === tag.id} />)
    }

    onDismiss = tag => {
        if (this.props.onDismiss) {
            this.props.onDismiss(tag);
        }
    }

    onClick = tag => {
        if (this.props.onClick) {
            this.props.onClick(tag);
        }
    }
}

TagList.propTypes = {
    tags: PropTypes.object.isRequired,
    onDismiss: PropTypes.func,
    onClick: PropTypes.func,
    activeTag: PropTypes.string
};