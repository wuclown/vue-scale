const path = require("path")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const baseWebpackConfig = require("./webpack.base.config")

module.exports = module.exports = merge(baseWebpackConfig, {
    entry: path.resolve("index.js"),
    output: {
        path: path.resolve("demo"),
        filename: "index.js",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve("index.html")
        })
    ]
})
