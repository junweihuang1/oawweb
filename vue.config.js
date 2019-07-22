module.exports = {
  // ...
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
