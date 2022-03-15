const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 注意最新版需要解构
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 注意最新版需要解构
const { resolve } = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// process.env.NODE_ENV = 'development';
const webpackConfig = {

  // webpack在入口chunk 中，包含了某些样板(boilerplate)，特别是runtime和manifest
  entry: {
    app: './src/index.js',
  },
  // output: {
  //     //hash和chunkhash的区别，hash和构建相关，改动一个文件会导致其他hash也跟着改，实际上浪费了缓存。而chunkhash只和chunk有关
  //     filename: '[name].[hash].js',
  //     chunkFilename: '[name].[hash].js',//配置非入口的chunk在输出时的文件名称
  //     path: path.resolve(__dirname, 'dist')
  // },

  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        /**
                 * 分离css文件的好处：可以在页面最前面单独引入css文件，减少白屏时间。
                 */
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
                     * css兼容性处理：postcss-> postcss-loader postcss-preset-env
                     * 帮助postcss找到package.json中browerlist的配置
                     *
                     *   // 默认看生产环境，同时会根据process.env.NODE_ENV选择读取开发环境还是生产环境
                        "browserslist": {
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            "production": [
                            "> 0.2%",
                            "not dead",
                            "not op_mini all"
                            ]
                        }
                     */

          // 使用loader的默认配置 webpack v4配套postcss-loader v4
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],

        // 开发环境建议使用style-loader，其实现了热模块替换。
        // use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        loader: 'url-loader',
        options: {
          name: 'img/[hash:10].[ext]',
          limit: 8 * 1024,
        },
      },
      {
        test: /\.html$/i,
        // html-loader专门负责处理html中的img图片
        loader: 'html-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[contenthash:10].[ext]',
        },
      },
      /**
       * js兼容性处理 babel-loader @babel/core @babel/preset-env
       * 1. 基本兼容性处理 --> @babel/preset-env
       *    问题：只能转换基本语法，如promise不能转换。
       * 2. 全部兼容性处理 -> @babel/polyfill
       * 3. 部分兼容性处理 ——> core-js
       */
      {
        test: /\.js$/i,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              { targets: "defaults" },
              /**
               * 注意 { targets: "defaults" }这句代码不能和下面的代码同时设置，否则会报错
               */
              // {
              //   useBuiltIns: 'usage',
              //   corejs: {
              //     version: 3
              //   },
              //   //指定具体兼容性到哪个浏览器
              //   targets: {
              //     chrome: '60',
              //     firefox: '50'
              //   }
              // }
            ]
          ]
        }
      }
      //   {
      //     test: /\.js$/i,
      //     exclude: '/node_modules/',
      //     loader: 'eslint-loader',
      //     options: {
      //       fix: true,
      //     },

      //   },
    ],
  },
  // 开发服务器特点，只会在内存中编译打包，不会有任何输出
  // 需要npx webpack-dev-server
  devServer: {
    // contentBase:resolve(__dirname, 'build'),
    port: 3000,
    compress: true,
    open: true,
  },
  plugins: [
    // 防止index.html引用旧的js文件名字
    // 该插件默认会创建一个html文件
    new HtmlWebpackPlugin({
      title: 'manage',
      // 复制该文件，并自动引入打包后的所有资源
      template: './src/index.html',

      //注意minify只在生产模式下起作用
      minify: {
        collapseWhiteSpace: true,
        removeComments: true,
      }
    }),

    /**
         * 每次build清理/dist文件夹
         * With zero configuration,
         *   clean-webpack-plugin will remove files inside the directory below
         */
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin(),

    /** 压缩CSS */
    new OptimizeCssAssetsPlugin(),
  ],
};
// 这个插件可以检测到webpack各个插件和loader所花费的时间。
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(webpackConfig);
