import { DefinePlugin } from 'webpack';
import { resolve } from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin, { extract } from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import Autoprefixer from 'autoprefixer';

import Config from './src/js/config';

const isProduction = process.env.NODE_ENV === 'prod';

const plugins = [
    new ExtractTextPlugin({
        filename: 'all.css',
    }),
    new DefinePlugin({
        IS_PRODUCTION: JSON.stringify(isProduction),
    }),
];

if (isProduction) {
    plugins.push(...[
        new UglifyJsPlugin({
            sourceMap: true,
        }),
    ]);
} else {
    plugins.push(...[
        new BrowserSyncPlugin({
            port: 3000,
            server: {
                baseDir: './',
            },
            ghostMode: false,
            notify: false,
            scrollProportionally: false,
            cors: true,
        }),
    ]);
}

export default {
    entry: {
        js: [
            './src/js/index.js',
        ],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'all.js',
        library: Config.name,
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
        },
        {
            test: /\.styl$/,
            exclude: /node_modules/,
            use: extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        minimize: isProduction,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: [
                            Autoprefixer,
                        ],
                    },
                },
                {
                    loader: 'stylus-loader',
                }],
            }),
        },
        {
            test: /\.json$/,
            exclude: /node_modules/,
        }],
    },
    watch: !isProduction,
    stats: {
        modules: false,
        hash: false,
        version: false,
    },
    devtool: !isProduction ? 'source-map' : false,
    plugins,
};
