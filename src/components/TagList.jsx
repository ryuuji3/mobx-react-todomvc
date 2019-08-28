import React from "react";
import PropTypes from 'prop-types';
import Tag from "./Tag";
import { observer } from "mobx-react";

@observer
export default class TagList extends React.Component {
    render() {
        const { rootStore } = this.props;
        const { tags } = rootStore;
        const list = this.renderList(tags);

        return <div className="TagList">
            <input type="text" placeholder="Create a new tag..." />
            <div>
                {list}
            </div>
        </div>
    }

    renderList(store) {
        const { tags } = store;

        return tags.map((tag, key) => <Tag store={store} tag={tag} key={key} />)
    }
}

TagList.propTypes = {
    rootStore: PropTypes.object.isRequired
};