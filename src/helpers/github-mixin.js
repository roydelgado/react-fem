import app from 'ampersand-app';

export default {
    //method to set auth headers when fetching from github api
    ajaxConfig() {
        return {
            headers: {
                Authorization: 'token ' + app.user.token
            }
        }
    }
}