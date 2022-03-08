const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//注意最新版需要解构
const { resolve } = require('path');
module.exports = {

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

    mode: 'development',
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
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(jpg|png|gif)$/i,
                loader: "url-loader",
                options: {
                    name: 'img/[hash:10].[ext]',
                    limit: 8 * 1024,
                }
            },
            {
                test: /\.html$/i,
                //html-loader专门负责处理html中的img图片
                loader: "html-loader",
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                loader: "file-loader",
                options: {
                    name: 'fonts/[contenthash:10].[ext]',
                  },
            },
        ],
    },
    //开发服务器特点，只会在内存中编译打包，不会有任何输出 
    //需要npx webpack-dev-server
    devServer: {
        // contentBase:resolve(__dirname, 'build'),
        port: 3000,
        compress: true,
        open: true,
    },
    plugins: [
        //防止index.html引用旧的js文件名字
        // 该插件默认会创建一个html文件
        new HtmlWebpackPlugin({
            title: 'manage',
            //复制该文件，并自动引入打包后的所有资源
            template: './src/index.html'
        }),

        /**
         * 每次build清理/dist文件夹
         * With zero configuration,
         *   clean-webpack-plugin will remove files inside the directory below
         */
        new CleanWebpackPlugin(),
    ]
};