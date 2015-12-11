import Model from 'ampersand-model';
//to make sure we have a valid token
import githubMixin from '../helpers/github-mixin';

export default Model.extend(githubMixin, {
    url () {
        return 'https://api.github.com/repos/' + this.full_name;
    },

    props: {
        id: 'number',
        name: 'string',
        full_name: 'string'
    },
    //derived properties
    derived : {
        repoUrl: {
            //url depends on: full name
            deps: ['full_name'],
            //function to automatically create the repo link
            fn () {
                return '/repo/' + this.full_name;
            }
        }
    }
});