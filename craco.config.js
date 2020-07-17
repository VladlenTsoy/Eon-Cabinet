const CracoAntDesignPlugin = require("craco-antd");
const CompressionPlugin = require('compression-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.GENERATE_SOURCEMAP = !isEnvProduction;

module.exports = {
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
        isEnvProduction &&
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css)$/,
        })
    ],
    plugins: [
        {plugin: CracoAntDesignPlugin},
    ],
};
