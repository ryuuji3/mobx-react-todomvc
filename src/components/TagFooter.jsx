import React from 'react';
import { observer } from 'mobx-react';
import TagList from './TagList';
import { computed, action } from 'mobx';
import PropTypes from 'prop-types';

@observer
class TagFooter extends React.Component {
    render() {
        return <TagList tags={this.props.viewStore.visibleTags} onDismiss={this.removeTag} onClick={this.filterTag} activeTag={this.activeTag} />;
    }

    @action
    removeTag = ({ id }) => {
        this.props.tagStore.removeTag(id);
    }

    @action
    filterTag = ({ id }) => {
        if (this.props.viewStore.tagFilter === id) {
            this.props.viewStore.tagFilter = null; // toggle filter
        } else {
            this.props.viewStore.tagFilter = id;
        }
    }

    @computed
    get activeTag() {
        return this.props.viewStore.tagFilter;
    }
}

TagFooter.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired
}

export default TagFooter;