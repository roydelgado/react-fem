import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LabelItem from '../components/label-item';

export default React.createClass({
    displayName: 'RepoInfo',

    mixins: [ampersandMixin],

    render () {
        const {repo, labels} = this.props;

        return (
            <div className='container'>
                <h1>{repo.full_name}</h1>
                <p></p>
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