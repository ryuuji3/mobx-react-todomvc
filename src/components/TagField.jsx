import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import InputField from './InputField';
import './ui/Button.css';
import './TagField.css';
import Button from './ui/Button';
import PropTypes from 'prop-types';

@observer
class TagField extends React.Component {
    @observable selected = false;
    @observable name = '';

    render() {
        const buttonText = <span>+ New tag</span>

        return <div className="TagField">
            { this.selected ? 
                <div className="Tag Button">
                    <InputField placeholder="New tag" value={this.name} onEnter={this.updateTag} onInput={this.updateName} onBlur={this.toggleSelect} />
                </div>
                :
                <Button text={buttonText} classes="grey-outline" onClick={this.toggleSelect} /> 
            }
        </div>
    }

    @action
    toggleSelect = () => {
        this.selected = !this.selected;
    }

    @action
    updateName = name => {
        this.name = name;
    }

    @action
    updateTag = name => {
        const tag = this.props.tagStore.addTag(name);
        
        this.props.onSubmit(tag);
        this.toggleSelect();
    }
}

TagField.propTypes = {
    tagStore: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default TagField;