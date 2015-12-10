import app from 'ampersand-app';
import React from 'react';
import localLinks from 'local-links';

export default React.createClass({
    displayName: 'NavHandler',

    onClick(e) {
        const pathname = localLinks.getLocalPathname(event);

        if (pathname) {
            event.preventDefault();

            //app.trigger('local', {data: 'test'});

            app.router.history.navigate(pathname);
        }
    },

    render () {
        return (
            //any properties passed will be applied in here
            <div {...this.props} onClick={this.onClick}>
                {this.props.children}
            </div>
        )
    }
});