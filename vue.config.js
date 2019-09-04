const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // ...
  publicPath: "./",
  productionSourceMap: false,
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     return {
  //       plugins: [
  //         new CompressionPlugin({
  //           test: /\.js$|\.html$|\.css/,
  //           threshold: 10240,
  //           deleteOriginalAssets: false
  //         })
  //       ]
  //     };
  //   }
  // },
  // configureWebpack: {
  //   externals: {
  //     vue: "Vue",
  //     // "vue-router": "VueRouter",
  //     vuex: "Vuex",
  //     axios: "axios",
  //     "element-ui": "ELEMENT"
  //   }
  // },
  chainWebpack: config => {
    config.module
      .rule("image-webpack-loader")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("file-loader")
      .loader("image-webpack-loader")
      .tap(() => ({
        disable: process.env.NODE_ENV !== "production"
      }))
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/static/common.scss";
          `
      }
    }
  }
};
