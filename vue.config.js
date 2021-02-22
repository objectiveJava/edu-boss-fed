// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        //   additionalData: `@import "~@/variables.scss";`
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
