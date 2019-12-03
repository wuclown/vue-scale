const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const baseWebpackConfig = require("./webpack.base.config")

const port = 8888
const host = "0.0.0.0"
module.exports = merge(baseWebpackConfig, {
    entry: path.resolve("index.js"),
    output: {
        filename: "[hash].app.js"
    },
    devServer: {
        port,
        host,
        clientLogLevel: "none",
        contentBase: path.resolve("component"),
        hot: true,
        quiet: true,
        overlay: {
            errors: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve("index.html")
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `You application is running here http://${host}:${port}`
                ]
            }
        })
    ]
})
