module.exports = {
  // ...
  publicPath: "./",
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
