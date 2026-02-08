const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
    },

    devtool: 'source-map',
};
