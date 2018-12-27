const base = require("./webpack.config.base");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge');

module.exports = merge(base,{
  mode: 'production',
  output: {
    path: __dirname + "/dist",
    filename: "[name]-[chunkhash].js"
  },
  plugins: [
    new cleanWebpackPlugin("dist/*"),
  ]
})