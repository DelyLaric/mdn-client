module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/core/vue.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html'
    }
  },

  chainWebpack: config => {
    config.resolve.extensions.add('.code.vue'),
    config.module
      .rule('vue')
        .test(/\.vue|.code.vue$/)
        .use('vue-code-wrapper')
          .loader('./vue-code-wrapper')
          .end()
    config.module
      .rule('vue-code-loader')
        .oneOf('vue-code-loader')
          .resourceQuery(/blockType=vue-auto-code/)
          .use('vue-code-loader')
          .loader('./vue-code-loader')
          .end()
  }
}
