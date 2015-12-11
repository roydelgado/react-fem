import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    displayName: 'Repos',

    mixins: [ampersandMixin],

    render () {
        const {repos} = this.props ;

        return (
            <div>
                <h2>Repos</h2>
                <ul>
                {repos.map((repo) =>
                //{
                    //return (
                        //we need a key to let react identify the elements and update them accordingly
                        <li key={repo.id}>
                            <span className='octicon octicon-repo'>&nbsp;
                            <a href={repo.repoUrl}>{repo.full_name}</a></span>
                        </li>
                    //)
                //}
                )}
                </ul>
            </div>
        )
    }
});