let base = require("./webpack.config.js");
let webpack = require("webpack");
let merge = require('webpack-merge');

module.exports = merge(base,{
  mode: 'development',
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: __dirname + "/dist",
    compress: true,
    hot: true,
    inline:true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }
    ]
  }
})