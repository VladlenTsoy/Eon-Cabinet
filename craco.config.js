const CracoLessPlugin = require('craco-less');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CracoAntDesignPlugin = require("craco-antd");
const {getThemeVariables} = require('antd/dist/theme');

const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.GENERATE_SOURCEMAP = !isEnvProduction;

module.exports = {
    module: {
        rules: [
            {
                test: /(dark|default).(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader?javascriptEnabled=true",
                ]
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 105000,
            cacheGroups: {
                default: {
                    test: /(default).(less)$/,
                    name: 'default',
                },
                dark: {
                    test: /(dark).(less)$/,
                    name: 'dark',
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // получает имя, то есть node_modules/packageName/not/this/part.js
                        // или node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // имена npm-пакетов можно, не опасаясь проблем, использовать
                        // в URL, но некоторые серверы не любят символы наподобие @
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            }
        }
    },
    webpackPlugins: [
        new MiniCssExtractPlugin({
            moduleFilename: 'static/css/[name].[contenthash:8].css',
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        })
    ],
    plugins: [
        {plugin: CracoAntDesignPlugin},
    ],
};
