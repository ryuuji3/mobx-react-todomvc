import React from 'react';
import Button from './ui/Button';
import PropTypes from 'prop-types';
import { action } from 'mobx';

class Tag extends React.Component {
    render() {
        const { tag, active } = this.props;

        return <div className="Tag">
            <Button
                active={active}
                text={tag.name}
                color={tag.color}
                onDismiss={this.onDismiss}
                onClick={this.onClick}
                dismissable
            />
        </div>;
    }

    @action
    onDismiss = () => {
        const { onDismiss, tag } = this.props;

        if (onDismiss) {
            onDismiss(tag);
        }
    }

    onClick = () => {
        const { onClick, tag } = this.props;

        if (onClick) {
            onClick(tag);
        }
    }
}

Tag.propTypes = {
    tag: PropTypes.object.isRequired,
    active: PropTypes.bool,
    onDismiss: PropTypes.func,
    onClick: PropTypes.func
}

export default Tag;