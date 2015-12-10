import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import Layout from './layout.js';

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
        'repos': 'repos'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    repos() {
        this.renderPage(<ReposPage/>);
    }
});