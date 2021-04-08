module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kkbox-podcast-project/'
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
