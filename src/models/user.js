import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import RepoCollection from './repo-collection';

export default Model.extend(githubMixin, {
    'url': 'https://api.github.com/user',

    //runs once
    initialize() {
        this.token = window.localStorage.token;
        //'change' handlers on backbone and ampersand
        this.on('change:token', this.onTokenChange);
        //this.fetchInitialData();
    },

    props: {
        id: 'number',
        login: 'string',
        avatar_url: 'string'
    },

    session: {
        token: 'string'
    },

    onTokenChange() {
        window.localStorage.token = this.token;
        this.fetchInitialData();
    },

    fetchInitialData() {
        if (this.token) {
            //fetch is part of the ampersand model
            //fetch the user
            this.fetch();
            //fetch the repos
            this.repos.fetch();
        };
    },
    //not expecting it to change
    collections: {
        repos: RepoCollection
    }

});