import Router from './router';
require('./styles/main.less');
import app from 'ampersand-app';
import User from './models/user'

window.app = app;

app.extend({
    init() {
        this.user = new User();
        this.user.fetchInitialData();
        this.router = new Router();
        //read router urls
        this.router.history.start();
    }
});

// app.on('local', function() {
//     console.log('local click triggered', arguments);
// });

app.init();