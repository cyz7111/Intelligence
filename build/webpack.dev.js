const commonWebpack = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
// const Dashboard= require('webpack-dashboard')
// const DashboardPlugin = require('webpack-dashboard/plugin')

// const dashboard =new Dashboard()

const port = "5421";

module.exports = merge(commonWebpack, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "../dist",
    host: "localhost",
    port: port,
    // open:true,
    hot: true,
    quiet: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
