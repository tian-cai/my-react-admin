
let base = require("./webpack.config.js");
let webpack = require("webpack");
let cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = Object.assign({},base,{
  mode: 'production',
  plugins: base.plugins.concat([
    new cleanWebpackPlugin("dist/*"),
  ])
})