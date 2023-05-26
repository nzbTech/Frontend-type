const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  transpileDependencies: ['@vue/cli-service'],
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser' // Ajout de la configuration pour 'process'
      })
    ]
  }
};