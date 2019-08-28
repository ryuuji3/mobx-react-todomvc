import React from "react";
import "./Tag.css";

export default function Tag(props) {
    const { tag } = props;
    const classes = `Tag ${tag.color}`

    return <button type="button" className={classes}>
        {tag.name}
    </button>
}