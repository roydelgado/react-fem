import Router from './router';
require('./styles/main.less');
import app from 'ampersand-app';

window.app = app;

app.extend({
    init() {
        this.router = new Router();
        //read router urls
        this.router.history.start();
    }
});

// app.on('local', function() {
//     console.log('local click triggered', arguments);
// });

app.init();