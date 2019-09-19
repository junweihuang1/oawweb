const CompressionPlugin = require("compression-webpack-plugin");
const isproduction = process.env.NODE_ENV === "production";
const cdn = {
  css: [],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
    "https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js",
    "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
    "https://cdn.bootcss.com/element-ui/2.12.0/index.js",
    "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js"
  ]
};
module.exports = {
  // ...
  publicPath: "./",
  productionSourceMap: false,
  configureWebpack: config => {
    if (isproduction) {
      config.externals = {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        "element-ui": "ELEMENT",
        echarts: "echarts"
      };
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      };
    }
  },

  chainWebpack: config => {
    if (isproduction) {
      // 生产环境注入cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
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
