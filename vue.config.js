const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // ...
  publicPath: "./",
  // productionSourceMap: false,
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
