// ./vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calendar-remote/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/assets/variables.scss";
        @import "~@/assets/mixin.scss";
        `
      },
    }
  }
}