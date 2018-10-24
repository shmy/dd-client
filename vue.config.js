const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

function getProductionPlugins () {
  return [
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: [
        '/',
        '/classify/5b1362ab30763a214430d036',
        '/classify/5b1fce6330025ae5371a6a8a',
        '/classify/5b1fd85730025ae5371abaed',
        '/classify/5b1fdbee30025ae5371ac363',
      ],
    })
  ];
}
module.exports = {
  baseUrl: "/",
  productionSourceMap: false,
  configureWebpack: {
    output: {
      jsonpFunction: 'j'
    },
    plugins:
      process.env.NODE_ENV !== 'production' ? [] : getProductionPlugins()
  }
};