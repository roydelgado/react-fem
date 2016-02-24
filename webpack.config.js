require('babel/register');
var getConfig = require('hjs-webpack')
  , React = require('react')
  , PublicPage = require('./src/pages/public')
  , Layout = require('./src/layout');

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  hostname: 'area51',
  port: 3210,
  html: (context) => {
    const publicPage = React.renderToString(React.createElement(PublicPage))
      ,  layoutPage = React.renderToString(React.createElement(Layout, {user: {}}));

    return {
        'index.html': context.defaultTemplate({html: publicPage}),
        '200.html': context.defaultTemplate({html: layoutPage})
    }
  }
});
