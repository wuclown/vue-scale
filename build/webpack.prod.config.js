const path = require("path")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.config")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = module.exports = merge(baseWebpackConfig, {
    entry: path.resolve("main.js"),
    output: {
        filename: "index.js",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    plugins: [new CleanWebpackPlugin()]
})
