import React from 'react';
import Label from './ui/Label';
import PropTypes from 'prop-types';

export default function TagLabel(props) {
    const { name, color } = props.tag;

    return <Label text={name} classes={color} />
}

TagLabel.propTypes = {
    tag: PropTypes.object.isRequired
}