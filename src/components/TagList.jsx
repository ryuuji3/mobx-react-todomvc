import React from "react";
import PropTypes from 'prop-types';
import Tag from "./Tag";

function renderList(store) {
    const { tags } = store;

    return tags.map((tag, key) => <Tag tag={tag} key={key} />)
}

export default function TagList(props) {
    const { rootStore } = props;
    const { tags } = rootStore;
    const list = renderList(tags);

    return <div className="TagList">
        <div>
            {list}
        </div>
    </div>
}

TagList.propTypes = {
    rootStore: PropTypes.object.isRequired
};