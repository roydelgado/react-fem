import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import app from 'ampersand-app';
import xhr from 'xhr';

export default Model.extend(githubMixin, {
    //has to be idAttribute , ie. can't use id
    idAttribute: 'name',

    props: {
        name: 'string',
        color: 'string'
    },

    //session stays local to the browser, props gets serialized and sent to the rest api
    session : {
        editing: {
            type : 'boolean',
            default: false
        },
        saved: {
            type: 'boolean',
            default: true
        }
    },

    isNew () {
        return !this.saved;
    },

    update (attributes) {
        const originalAttrs = this.getAttributes({
            props: true,
            session: false
        });

        xhr({
            url: this.url(),
            json: attributes,
            method: 'PATCH',
            headers: {
                Authorization: 'token ' + app.user.token
            }
        }, (err, req, body) => {
            if (err) {
                this.set(originalAttrs);
                console.log('Error updating ', err);
            }
        });

        this.set(attributes);
    }
});