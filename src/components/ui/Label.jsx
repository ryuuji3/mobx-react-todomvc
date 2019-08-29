import React from "react";
import "./Label.css";

export default function Label(props) {
    const { text } = props;
    const classes = `Label ${props.classes}`;

    return <div className={classes}>
        {text}
    </div>
}