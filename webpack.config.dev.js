const base = require("./webpack.config.base");
const webpack = require("webpack");
const merge = require('webpack-merge');

module.exports = merge(base,{
  mode: 'development',
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist",
    filename: "[name]-[hash].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: __dirname + "/dist",
    compress: true,
    hot: true,
    inline:true,
    historyApiFallback: true
  }
})