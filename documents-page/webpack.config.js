const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (_env, argv) => ({
    mode: argv.mode || 'none',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html', //source
            filename: 'index.html', // destination,
            favicon: 'favicon.ico',
        }),
        ...(argv.mode === 'production'
            ? [new webpack.NormalModuleReplacementPlugin(/\/src\/environment\/index\.js/, 'prod.js')]
            : []),
    ],
});
