import Model from 'ampersand-model';
//to make sure we have a valid token
import githubMixin from '../helpers/github-mixin';
//include labels as a child of Repo
import LabelCollection from './label-collection';

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
    },
    //a label collection will always be included with a Repo
    collections: {
        labels: LabelCollection
    },

    fetch() {
        Model.prototype.fetch.apply(this, arguments);
        this.labels.fetch();
    }

});