const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//注意最新版需要解构
module.exports = {

    // webpack在入口chunk 中，包含了某些样板(boilerplate)，特别是runtime和manifest
    entry: {
        app: './src/index.js',
        another: './src/another-module.js',
        test: './src/test.js',
        vendor: ['lodash']
    },
    output: {
        //hash和chunkhash的区别，hash和构建相关，改动一个文件会导致其他hash也跟着改，实际上浪费了缓存。而chunkhash只和chunk有关
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

    // mode: 'production',  webpack3.x.x不支持该属性，我透。
    
    plugins: [

        // 使vendor的hash不变化,推荐生产环境构建
        new webpack.HashedModuleIdsPlugin(),

        // vendor顺序不能乱，必须在manifest之前，我透~
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),


        // 通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中。比如runtime和manifest
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),

        //防止index.html引用旧的js文件名字
        new HtmlWebpackPlugin({
            title: 'manage'
        }),

        /**
         * 每次build清理/dist文件夹
         * With zero configuration,
         *   clean-webpack-plugin will remove files inside the directory below
         */
        new CleanWebpackPlugin(),
    ]
};