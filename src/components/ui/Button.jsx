import React from "react";
import PropTypes from 'prop-types';
import "./Button.css";
import { defaultHandler } from "../../utils";

function dismissButton(handler) {
    return <span>&nbsp;
        <a href="#" onClick={handler}>&#x2715;</a>
    </span>;
}

export default function Button(props) {
    const { text, color, dismissable, onClick, onDismiss } = props;
    const classes = `Button ${color}`;

    // Use default handlers if none provided
    const clickHandler = onClick || defaultHandler;
    const dismissHandler = onDismiss || defaultHandler;

    return <div className={classes}>
        <button type="button" onClick={clickHandler}>
            {text}
        </button>
        {dismissable ? dismissButton(dismissHandler) : undefined}
    </div>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    classes: PropTypes.string,
    dismissable: PropTypes.bool,
    onClick: PropTypes.func,
    onDismiss: PropTypes.func
}
