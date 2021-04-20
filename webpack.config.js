//基本的webpack配置
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");//生成 html 文件,多页应用打包
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//在打包前清理上一次项目生成的 dist 文件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");//将 css 成生文件，而非内联 
// const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件,去除生产环境中重复的css
// const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css代码
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//单线程压缩js,vue-cli的默认压缩插件
// const TerserPlugin = require('terser-webpack-plugin') // 压缩js代码，webpack4.默认压缩插件
// const CompressionPlugin = require('compression-webpack-plugin')// 对CSS、JavaScript 和 HTM进行gzip压缩，需要后端配置支持
// const CopyWebpackPlugin = require('copy-webpack-plugin')//在 public/index.html 中引入了静态资源，但是打包的时候 webpack 并不会帮我们拷贝到 dist 目录
//HotModuleReplacementPlugin热更新;DefinePlugin定义全局的变量；ProvidePlugin自动加载模块；IgnorePlugin忽略第三方包指定目录比如moment
const webpack = require("webpack");
const port = "8444";

module.exports = {
  //环境
  mode: "development",
  //入口
  entry: path.join(__dirname, "src/main.js"),
  //出口
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
    //加载外部资源
    // publicPath:path.join(__dirname, "dist/static"),
    // clean: true,
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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/img/[hash][ext][query]",
        },
        //npm run serve时不管用
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       limit: 10000,
        //       outputPath: path.resolve(__dirname, "dist","static"),
        //     },
        //   },
        // ],
      },
      {
        test:/\.(jsx|js)$/i,
        use:'babel-loader'
      },
      {
        test: /\.tsx?$/,
        // ts-loader是官方提供的处理tsx的文件
        use: 'ts-loader',
        exclude: /node_modules/
       },
      // {
      //   test: /\.svg$/i,
      //   use: [
      //     {
      //       loader: "svg-sprite-loader",
      //       options: {
      //         symbolId:'icon-[name]',
      //         outputPath: path.resolve(__dirname, "dist","icon"),
      //       },
      //     },
      //   ],
      //   include: path.resolve(__dirname, "./src/icons"),
      // },
      // {
      //   test: /.\html$/i,
      //   use: "html-loader",
      // },
      {
        test: /.\less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.\sass$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
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
    //生成 html 文件|多页应用打包
    new HtmlWebpackPlugin({
      //在 dist/index.html 的输出，并自动引入index.js
      filename: "index.html",
      //模板来源
      template: path.join(__dirname, "public/index.html"),
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
      //将js文件放在body底部:true默认值,body,head,false不插入生成的 js 文件，只是单纯的生成一个 html 文件
      inject: true,
      //浏览器图标
      favicon: path.join(__dirname, "public/favicon.ico"),
      //chunk仅会将数组中指定的 js 引入到 html 文件中
      // chunk:['']
    }),
    //热模块替换插件，注意不能用在生产环境
    new webpack.HotModuleReplacementPlugin(),
    //在打包前清理上一次项目生成的 dist 文件，它会根据 output.path 自动清理文件夹
    new CleanWebpackPlugin(),
    // 将css分离到/dist文件夹下的css文件夹中的index.css；
    // mini-css-extract-plugin异步加载，只能用在 webpack4 中，这个插件应该只用在生产环境配置，并且在 loaders 链中不使用 style-loader, 而且这个插件暂时不支持 HMR
    // new ExtractTextPlugin("css/index.css"),
    //将在index.html中引入的静态资源复制到dist
    // new CopyWebpackPlugin({
    //   patterns:[{
    //     from:path.join(__dirname, 'src/main.js'),
    //     to:path.resolve(__dirname, 'dist', 'js'),
    //     patterns:true
    //   }]
    // })
  ],
  //选项----简化路径
  resolve: {
    //路径代理简写
    alias: {
      //多个的话用数组
      "@": path.join(__dirname, "src"),
    },
  },
  //服务器----实时热更新
  devServer: {
    // index: 'index.html',
    contentBase: "./dist",
    port: port,
    host: "localhost",
    //静态资源
    // contentBase:path.join(__dirname, 'assets'),
    //运行后打开默认浏览器
    // open: true,
    //热模块替换
    hot: true,
    //默认打开的页面
    // openPage:path.join(__dirname,'index.html'),
    //接口代理
    // proxy:{
    //   '/api':'http://localhost:7300'
    // }
  },
};
