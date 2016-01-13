const config = {
    'area51': {
        'authUrl': 'https://react-fem-oauth.herokuapp.com/authenticate',
        'clientId': '0c02c174077bc2a4adac'
    },
    'roydelgado.surge.sh': {
        'authUrl': 'https://react-fem-oauth-prod.herokuapp.com/authenticate',
        'clientId': 'ed6c36c56dce6224c035'
    },
    'roydelgado.com': {
        'authUrl': 'https://roydelgado-oauth-lablr.herokuapp.com/authenticate',
        'clientId': '423948d139be018f798a'
    }
}[window.location.hostname];

export default config;