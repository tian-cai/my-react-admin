
const base = require("./webpack.config.js");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(base,{
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
      },
    ]
  },
  plugins: [
    new cleanWebpackPlugin("dist/*"),
    new ExtractTextPlugin({
      filename: "[name]-[hash].css",
      allChunks: false
    }),
  ]
})