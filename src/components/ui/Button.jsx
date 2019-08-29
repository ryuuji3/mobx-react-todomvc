import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { defaultHandler } from '../../utils';

function dismissButton(handler) {
    return <span>&nbsp;
        <a href="#" onClick={handler}>&#x2715;</a>
    </span>;
}

export default function Button(props) {
    const { text, color, active, dismissable, onClick, onDismiss } = props;
    const classes = `Button ${color ? color: ''} ${active ? 'active' : ''} ${props.classes ? props.classes : ''}`;

    // Use default handlers if none provided
    const clickHandler = e => {
        if (onClick) {
            onClick(e);
        } else {
            defaultHandler(e);
        }
    };
    const dismissHandler = e => {
        if (onDismiss) {
            onDismiss(e);
        } else {
            defaultHandler(e);
        }
    };

    return <div className={classes}>
        <button type="button" onClick={clickHandler}>
            {text}
        </button>
        {dismissable ? dismissButton(dismissHandler) : undefined}
    </div>;
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    color: PropTypes.string,
    classes: PropTypes.string,
    dismissable: PropTypes.bool,
    onClick: PropTypes.func,
    onDismiss: PropTypes.func,
    active: PropTypes.bool
}

