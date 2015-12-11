import app from 'ampersand-app';
import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import Layout from './layout.js';
import qs from 'qs';
import xhr from 'xhr';
import RepoInfo from './pages/repo-info';

export default Router.extend({

    renderPage(page, opts = {layout: true}) {
        if (opts.layout) {
            page = (
                //whenever user changes, its going to force an update
                <Layout user={app.user}>
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
        'logout': 'logout',
        'repo/:owner/:name': 'repoInfo',
        'repos': 'repos'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    authCallback(query) {
        query = qs.parse(query);
        console.log('query string:', query);
        //deployed on heroku https://github.com/prose/gatekeeper
        xhr({
            url: 'https://react-fem-oauth.herokuapp.com/authenticate/' + query.code,
            json: true
        }, (err, req, body) => {
            console.log('got a token', body);
            app.user.token = body.token;
            this.redirectTo('/repos')
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

    logout() {
        window.localStorage.clear();
        window.location = '/';
    },

    repoInfo(owner, name) {
        const model = app.user.repos.getByFullName(owner + '/' + name);
        this.renderPage(<RepoInfo repo={model} />)
    },

    repos() {
        this.renderPage(<ReposPage repos={app.user.repos} />);
    }
});