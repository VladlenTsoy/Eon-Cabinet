const {override, fixBabelImports, addBundleVisualizer, addLessLoader, addWebpackAlias, addWebpackPlugin, setWebpackOptimizationSplitChunks} = require('customize-cra');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ThemesGeneratorPlugin = require('themes-switch/ThemesGeneratorPlugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const addMinimizer = (config) => {
    config.entry = {
        app: config.entry,
        // light: path.resolve(__dirname, 'src/styles/themes/light.less'),
        // dark: path.resolve(__dirname, 'src/styles/themes/dark.less'),
    };
    config.devtool = config.mode === 'production' ? false : 'source-map';
    config.optimization.minimizer = [
        config.optimization.minimizer[0],
        ...config.mode === 'production' ?
            [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            unsafe: true,
                            inline: true,
                            passes: 2,
                            keep_fargs: false,
                        },
                        output: {
                            beautify: false,
                        },
                        mangle: true,
                    },
                    sourceMap: false,
                }),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    //     cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', {discardComments: {removeAll: true}}],
                        autoprefixer: {disable: true},
                        "safe": true,
                        "map": {"inline": false},
                    },
                    canPrint: true
                }),
            ] : [],
    ];

    console.log(config);
    return config;
};

module.exports = override(
    addMinimizer,
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
    }),
    addLessLoader({javascriptEnabled: true}),
    addBundleVisualizer({}, true),
    setWebpackOptimizationSplitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 105000,
            cacheGroups: {
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
    ),
    addWebpackPlugin(new ThemesGeneratorPlugin({
        srcDir: 'src',
        themesDir: 'src/styles/themes',
        outputDir: 'static/css',
        defaultStyleName: 'default.less',
        clearTemp: false,
    })),
    // addWebpackPlugin(new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, 'public/index.html'),
    //     manifest: path.resolve(__dirname, 'public/favicon.ico'),
    //     excludeChunks: [
    //         'css/dark.css',
    //         'css/light.css'
    //     ]
    // })),
    addWebpackAlias({
        'src': path.resolve(__dirname, './src'),
        'components': path.resolve(__dirname, './src/components'),
        'layouts': path.resolve(__dirname, './src/layouts'),
        'lib': path.resolve(__dirname, './src/lib'),
        'effects': path.resolve(__dirname, './src/effects'),
        'assets': path.resolve(__dirname, './src/assets'),
        'tools': path.resolve(__dirname, './src/tools'),
        'store': path.resolve(__dirname, './src/store')
    })
);