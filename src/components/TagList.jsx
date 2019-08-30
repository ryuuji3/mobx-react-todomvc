import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import './TagList.css';

class TagList extends React.Component {
    render() {
        const list = this.renderList(this.props);
        const classes = `TagList ${this.props.classes ? this.props.classes : ''}`;

        return <div className={classes}>
            {list}
            {this.props.children}
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
    classes: PropTypes.string,
    tags: PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,
    onDismiss: PropTypes.func,
    onClick: PropTypes.func,
    activeTag: PropTypes.string,
    children: PropTypes.element
};

export default TagList;