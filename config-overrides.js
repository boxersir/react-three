/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-03-10 22:31:47
 * @LastEditors: boxersir
 * @LastEditTime: 2024-05-23 07:43:26
 * @Description: file content
 */
const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra')
const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');// 分析打包后的文件体积
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')

if (process.env.NODE_ENV === "production") {
    process.env.GENERATE_SOURCEMAP = "false";
}
const IS_PROD = ['prod', 'production'].includes(process.env.NODE_ENV)

// diy 输出
const { CustomPlugin, CheckFileSize, IgnorePlugin } = require('./diyPlugin');
module.exports = override(
    addWebpackAlias({
        // 指定@符指向src目录
        '@': path.resolve(__dirname, './src'),
    }),
    addWebpackPlugin(new IgnorePlugin()),
    // addWebpackPlugin(new UglifyJsPlugin({
    //     // 开启打包缓存
    //     cache: true,
    //     // 开启多线程打包
    //     parallel: true,
    //     uglifyOptions: {
    //         // 删除警告
    //         warnings: false,
    //         // 压缩
    //         compress: {
    //             // 移除console
    //             drop_console: true,
    //             // 移除debugger
    //             drop_debugger: true,
    //         },
    //     }
    // })),
    addWebpackPlugin(new BundleAnalyzerPlugin()),
    addWebpackPlugin(new ProgressBarPlugin()),
    addWebpackPlugin(new CompressionPlugin()),
    (config) => {
        //暴露webpack的配置 config ,evn
        // 去掉打包生产map 文件
        config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
        // config.devtool = process.env.NODE_ENV === "production" ? false : true;
        return config
    }
)
