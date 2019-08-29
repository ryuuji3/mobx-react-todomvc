import React from 'react';
import './Label.css';
import PropTypes from 'prop-types';

export default function Label(props) {
    const { text } = props;
    const classes = `Label ${props.classes}`;

    return <div className={classes}>
        {text}
    </div>
}

Label.propTypes = {
    text: PropTypes.string.isRequired,
    classes: PropTypes.string
};