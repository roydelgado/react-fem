import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LabelItem from '../components/label-item';

export default React.createClass({
    displayName: 'RepoInfo',

    mixins: [ampersandMixin],

    _addLabel () {
        this.props.labels.add({
            name: '',
            color: '',
            editing: true,
            saved: false
        }, {
            at: 0
        });
    },

    render () {
        const {repo, labels} = this.props;

        return (
            <div className='container'>
                <h1>{repo.full_name}</h1>
                <p>
                    <button onClick={this._addLabel} className="button">Create new label</button>
                </p>
                <ul>
                    {labels.map((label) => (
                        //apply unknown props: {...myObj}
                        <LabelItem key={label.name} label={label} />
                    ))}
                </ul>
            </div>
        )
    }
});