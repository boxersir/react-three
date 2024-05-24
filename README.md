# react-three
react18 three.js react-three-fiber redux redux-saga webpack

#安装依赖
yarn

#启动 npm run serve

#配置了多个插件。🤣不需要可以自己注释
       addWebpackPlugin(new IgnorePlugin()),  // 自动忽略大文件
    // addWebpackPlugin(new UglifyJsPlugin({
    //     // 开启打包缓存
    //     cache: true,
    //     // 开启多线程打包
    //     parallel: true,
    .....
    //         },
    //     }
    // })),
    addWebpackPlugin(new BundleAnalyzerPlugin()), // 打包文件分析库
    addWebpackPlugin(new ProgressBarPlugin()),
    addWebpackPlugin(new CompressionPlugin()),
