import app from 'ampersand-app';
import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import MessagePage from './pages/message';
import Layout from './layout.js';
import qs from 'qs';
import xhr from 'xhr';
import RepoInfo from './pages/repo-info';
import config from './config';

function requiresAuth(route) {
    return function () {
        if (!app.user.token) {
            this['login'].apply(this);
            //this.redirectTo('/');
        } else {
            //this[route](); won't work, we need to pass the context of our route config
            this[route].apply(this, arguments);
        }
    }
}

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
        'repo/:owner/:name': requiresAuth('repoInfo'),
        'repos': requiresAuth('repos'),
        '*catchAll': 'catchAll'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    authCallback(query) {
        query = qs.parse(query);
        console.log('query string:', query);
        //deployed on heroku https://github.com/prose/gatekeeper
        xhr({
            url: config.authUrl + '/' + query.code,
            json: true
        }, (err, req, body) => {
            console.log('got a token', body);
            app.user.token = body.token;
            this.redirectTo('/repos')
        });

        this.renderPage(<MessagePage title='Loading data...'/>);
    },

    catchAll () {
        this.renderPage(<MessagePage title='Not found' body='The requested page was not found.'/>);
    },

    login() {
        window.location = 'https://github.com/login/oauth/authorize?'
        + qs.stringify({
            client_id: config.clientId,
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
        this.renderPage(<RepoInfo repo={model} labels={model.labels} />)
    },

    repos() {
        this.renderPage(<ReposPage repos={app.user.repos} />);
    }
});