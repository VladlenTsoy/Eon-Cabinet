const CracoLessPlugin = require("craco-less")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const CompressionPlugin = require("compression-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

const isEnvProduction = process.env.NODE_ENV === "production"
process.env.GENERATE_SOURCEMAP = !isEnvProduction

module.exports = {
    webpack: {
        configure: (webpackConfig, {env}) => {
            if (env === "development")
                webpackConfig.module.rules.push({
                    test: /(dark|default).(less)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "less-loader?javascriptEnabled=true"
                    ]
                })

            webpackConfig.optimization.splitChunks = {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 105000,
                cacheGroups: {
                    default: {
                        test: /(default).(less)$/,
                        name: "default"
                    },
                    dark: {
                        test: /(dark).(less)$/,
                        name: "dark"
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // получает имя, то есть node_modules/packageName/not/this/part.js
                            // или node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                            // имена npm-пакетов можно, не опасаясь проблем, использовать
                            // в URL, но некоторые серверы не любят символы наподобие @
                            return `npm.${packageName.replace("@", "")}`
                        }
                    }
                }
            }
            return webpackConfig
        },
        plugins: !isEnvProduction ? [
            new MiniCssExtractPlugin({
                moduleFilename: "static/css/[name].[contenthash:8].css",
                filename: "static/css/[name].[contenthash:8].css",
                chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
            })
        ] : [
            new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css)$/
            }),
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true
            }),
            new BundleAnalyzerPlugin()
        ]
    },
    plugins: [
        {
            plugin: BabelRcPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        },
        {
            plugin: rewireBabelLoader,
            options: {
                excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            }
        }
    ]
}