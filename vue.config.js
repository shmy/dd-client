module.exports = {
  baseUrl: "/",
  productionSourceMap: false,
  configureWebpack: {
    output: {
      jsonpFunction: 'j'
    },
  }
};