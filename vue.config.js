const path = require('path');  

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-cli-ghpages/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ],
  // outputDir: path.resolve(__dirname, '../api.v1/public'),
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000'
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@' : path.resolve(__dirname, 'src/components/'),
        '@Plugins' : path.resolve(__dirname, 'src/plugins/'),
      }
    }
  }
}
