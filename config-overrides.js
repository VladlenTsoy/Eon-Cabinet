const {override, addLessLoader, fixBabelImports, addBundleVisualizer, addWebpackAlias, addWebpackPlugin, setWebpackOptimizationSplitChunks} = require('customize-cra');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
process.env.GENERATE_SOURCEMAP = !isEnvProduction;

const addMinimizer = (config) => {
    if (!isEnvProduction) {
        config.module.rules.push({
            test: /(dark|default).(less)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader?javascriptEnabled=true",
            ]
        });
        config.plugins.push(new MiniCssExtractPlugin({
            moduleFilename: 'static/css/[name].[contenthash:8].css',
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }));
    } else {
        config.plugins[0].options.inject = false;
    }
    return config;
};

module.exports = override(
    addMinimizer,
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
    }),
    addLessLoader({javascriptEnabled: true}),
    addBundleVisualizer({}, !isEnvProduction),
    setWebpackOptimizationSplitChunks({
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
    }),
    isEnvProduction ?
        addWebpackPlugin(new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css)$/,
        })) : null,
    addWebpackAlias({
        'src': path.resolve(__dirname, './src'),
        'components': path.resolve(__dirname, './src/components'),
        'layouts': path.resolve(__dirname, './src/layouts'),
        'lib': path.resolve(__dirname, './src/lib'),
        'effects': path.resolve(__dirname, './src/hooks'),
        'assets': path.resolve(__dirname, './src/assets'),
        'tools': path.resolve(__dirname, './src/tools'),
        'store': path.resolve(__dirname, './src/store')
    }),
);