//基本的webpack配置
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const port = "8444";

module.exports = {
  //环境
  // mode: "development",
  //入口
  entry: path.join(__dirname, "src/main.js"),
  //出口
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  //模板
  module: {
    //规则----在js中识别使用其它类型文件
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        //忽略不需要处理的文件夹
        exclude: /node_modules/,
        //必须要处理的文件夹
        include: path.resolve(__dirname, "./src"),
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "images",
            },
          },
        ],
      },
      {
        test:/.\less$/i,
        use:["style-loader","css-loader","less-loader"]
      },
      {
        test:/.\sass$/i,
        use:["style-loader","css-loader","sass-loader"]
      },
    ],
  },
  //插件----及时更新
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env':{
    //      NODE_ENV:env
    //   }
    // }),
    //没有这个插件vue文件构建会报错
    new VueLoaderPlugin(),
    //好用
    new HtmlWebpackPlugin({
      //在 dist/index.html 的输出，并自动引入index.js
      filename: "index.html",
      //模板来源
      template: "./public/index.html",
      //将js文件放在body底部
      inject: "body",
      //浏览器图标
      favicon: path.resolve("./public/favicon.ico"),
    }),
  ],
  //选项----简化路径
  resolve: {
    //路径代理简写
    alias: {
      //多个的话用数组
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //服务器----实时热更新
  devServer: {
    contentBase: "./dist",
    port: port,
    host: "localhost",
  },
};
