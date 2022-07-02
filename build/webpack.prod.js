const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.common.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(commonWebpack, {
  mode: "production",
  devtool:'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename:'[name].css',
      chunkFilename:'[id].css'
    })
  ],
});
