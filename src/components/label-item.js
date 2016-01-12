import ampersandMixin from 'ampersand-react-mixin';
import React from 'react';

export default React.createClass({
    displayName: 'LabelItem',

    mixins: [ampersandMixin],

    _labelEdit (label) {
        this.props.label.editing = true;
    },

    _labelCancel (event) {
        event.preventDefault();
        this.props.label.editing = false;
        this.setState(this.getInitialState());
    },

    _labelDelete (event) {
        if (confirm('Are you sure you want to delete "' + this.props.label.name + '"')) {
            this.props.label.destroy({
                wait: true
            });
        }
    },

    _onNameChange (e) {
        this.setState({
            name: e.target.value
        });
    },

    _onColorChange (e) {
        this.setState({
            color: e.target.value.slice(1)
        });
    },

    _handleSubmit (e) {
        e.preventDefault();
        this.props.label.update(this.state);
        this.props.label.editing = false;
    },

    getInitialState () {
        const {name, color} = this.props.label;
        return {name, color};
    },

    render () {
        const {label} = this.props,
            {color} = this.state,
            cssColor = '#' + color;
        let content;

        //editing
        if (label.editing) {
            content = (
                <form className='label' onSubmit={this._handleSubmit}>
                    <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                    <input name='name' value={this.state.name} onChange={this._onNameChange} />
                    <input name='color' value={cssColor} onChange={this._onColorChange}/>
                    <button type='submit' className='button button-small'>Save</button>
                    <button type='button' className='button button-small button-unstyled' onClick={this._labelCancel}>cancel</button>
                </form>
            )
        } else {
            content = (
                <div className='label'>
                    <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
                    <span>{label.name}</span>
                    <span className='octicon octicon-pencil' onClick={this._labelEdit}></span>
                    <span className='octicon octicon-x' onClick={this._labelDelete}></span>
                </div>
            )
        }

        return <div>{content}</div>
    }
});