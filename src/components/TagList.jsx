import React from "react";
import PropTypes from 'prop-types';
import Tag from "./Tag";
import { observer } from "mobx-react";

@observer
export default class TagList extends React.Component {
    render() {
        const list = this.renderList(this.props.tagStore);

        return <div className="TagList">
            {list}
            { this.props.children }
        </div>
    }

    renderList(store) {
        const { tags } = store;

        return tags.map((tag, key) => <Tag store={store} tag={tag} key={key} />)
    }
}

TagList.propTypes = {
    tagStore: PropTypes.object.isRequired
};