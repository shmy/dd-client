const WorkboxPlugin = require("workbox-webpack-plugin");

function createPlugin() {
  return [
    new WorkboxPlugin.GenerateSW({
      importWorkboxFrom: "local",
      importsDirectory: "wb-assets",
      runtimeCaching: [
        {
          urlPattern: /\.js/,
          handler: 'staleWhileRevalidate',
        },
        {
          urlPattern: /\.css/,
          handler: 'staleWhileRevalidate',
        }
      ],
    }),
  ]
}

module.exports = {
  baseUrl: "/",
  productionSourceMap: false,
  configureWebpack: {
    output: {
      jsonpFunction: 'j'
    },
    plugins: process.env.NODE_ENV === 'production' ? createPlugin() : [],
  }
};