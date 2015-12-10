import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import Layout from './layout.js';
import qs from 'qs';
import xhr from 'xhr';

export default Router.extend({

    renderPage(page, opts = {layout: true}) {
        if (opts.layout) {
            page = (
                <Layout>
                    {page}
                </Layout>
            );
        }

        React.render(page, document.body);
    },

    routes: {
        '': 'public',
        'auth/callback?:qs': 'authCallback',
        'login': 'login',
        'repos': 'repos'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    authCallback(query) {
        query = qs.parse(query);
        console.log('query string:', query);

        xhr({
            url: 'https://react-fem-oauth.herokuapp.com/authenticate/' + query.code,
            json: true
        }, (err, req, body) => {
            console.log('got a token', body);
        });
    },

    login() {
        window.location = 'https://github.com/login/oauth/authorize?'
        + qs.stringify({
            client_id: '0c02c174077bc2a4adac',
            redirect_uri: window.location.origin + '/auth/callback',
            scope: 'user,repo'
        });
    },

    repos() {
        this.renderPage(<ReposPage/>);
    }
});