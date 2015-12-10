import Router from './router';
require('./styles/main.less');

window.app = {
    init() {
        this.router = new Router();
        //read router urls
        this.router.history.start();
    }
};

window.app.init();