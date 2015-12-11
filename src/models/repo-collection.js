//a "Store" for our repo model
import Collection from 'ampersand-rest-collection';
import Repo from './repo';
import githubMixin from '../helpers/github-mixin';

export default Collection.extend(githubMixin, {
    //lazy way to fetch data every 5 seconds
    //if nothing has changed then nothing will be redrawn
    // initialize() {
    //     setInterval(() => {
    //         this.fetch();
    //     }, 5000);
    // }

    url: 'https://api.github.com/user/repos',

    model: Repo,

    //attempt to fetch info
    getByFullName(fullName) {
        //findWhere comes with Collection
        //loop collection looking for the fullName
        let model = this.findWhere({
            full_name: fullName
        });

        if (!model) {
            model = new Repo({
                full_name: fullName
            });
        }

        model.fetch();

        return model;
    }
});