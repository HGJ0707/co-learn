const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin")

if (process.env.NODE_ENV === "production") {
    module.exports = {
        plugins: [
            new BundleAnalyzerPlugin(),
            new CompressionPlugin({
                test: /\.(js|css)$/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                minRatio: 0.8,
                deleteOriginalAssets: false // 删除源文件
            })
        ],
        // externals: {
        //     vue: "Vue",
        //     vuex: "Vuex",
        //     "vue-router": "VueRouter",
        //     "ant-design-vue": "antd",
        //     xlsx: "XLSX"
        // },
    };
} else {
    module.exports = {};
}