const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");//依赖chalk
const chalk = require('chalk')

const resolve = (dir)=>{
  return path.join(__dirname,'../',dir)
}

module.exports = {
  entry: {
    app: resolve("src/main.js"),
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
        exclude: /node_modules/, ///node_modules|bower_components/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/img/[hash][ext][query]",
        },
      },
      {
        test: /\.(jsx|tsx|js)$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.\less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.\sass$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: "svg-sprite-loader",
        // query: {
        //     prefixize: true,
        //     name: '[name]-[hash]'
        // },
        include: path.join(__dirname, "../src"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
      favicon: path.join(__dirname, "../public/favicon.ico"),
      inject: true,
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format:
      chalk.green.bold("build [:bar]") + chalk.green.bold(":percent")  + "(Time: :elapsed seconds)",
      // width: 40,
      complete: "=",
      renderThrottle: "50ms",
      clear: false,
      summaryContent:true
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json", ".css", ".less"],
    //路径代理简写
    alias: {
      //多个的话用数组
      "@": path.join(__dirname, "../src"),
      "@assets": path.join(__dirname, "../src/assets"),
    },
  },
};
