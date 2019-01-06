const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  productionSourceMap: false,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  }
};
