const path = require('path');
const dotenv = require('dotenv');
const rules = require('./loaders');
const devServer = require('./devServer');
const plugins = require('./plugins');

dotenv.config();

module.exports = {
    target: 'web',
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        path.join(__dirname, '../src', 'index.jsx')
    ],
    output: {
        path: path.join(__dirname, '../target'),
        filename: 'app.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules'),
        ],
    },
    module: {
        rules
    },
    plugins: process.env.NODE_ENV === 'development' ? plugins.dev : plugins.prod,
    devServer,
    devtool: 'inline-source-map', // for development,
};
