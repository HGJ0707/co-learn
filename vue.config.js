module.exports = {
    publicPath: "/",
    // 关闭Source Maps
    productionSourceMap: false,
    // 去除console.log
    chainWebpack(config) {
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true
            return args
        });
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://124.221.241.128:7001/api"
            },
            "/": {
                target: "http://124.221.241.128:7001/"
            },
        },
    },
    // 打包结果分析
    configureWebpack: require("./webpack.config"),
};