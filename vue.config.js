module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kkbox-potcast-project/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/main.scss";
        `
      }
    }
  }
}
