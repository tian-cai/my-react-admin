let base = require("./webpack.config.js");
let webpack = require("webpack");

module.exports = Object.assign({},base,{
  mode: 'development',
  devtool: "inline-source-map",
  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devServer: {
    contentBase: __dirname + "/dist",
    compress: true,
    hot: true,
    inline:true,
    historyApiFallback: true
  }
})