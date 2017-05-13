const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const common = [
    new HappyPack({
        loaders: ['babel-loader'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        }
    }),
    new Html({
        template: path.join(__dirname, '../src', 'index.html'),
    }),
    new ExtractTextPlugin({
        filename: 'app.css',
        allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: () => [
                autoprefixer({
                    browsers: ['last 3 versions'],
                })
            ],
            sassLoader: {
                includePaths: [path.resolve(__dirname, 'lib/css')],
            },
            cssLoader: {
                minimize: true,
                sourceMap: true,
            },
            fileLoader: {
                prefix: 'fonts/',
                name: 'fonts/[name].[hash].[ext]',
            },
            urlLoader: {
                limit: 8192,
                name: 'img/[name].[ext]',
            },
            eslintLoader: { failOnError: true },
            context: __dirname,
        }
    }),
];

const prod = [
    ...common,
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
];

const dev = [
    ...common,
    new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
    dev,
    prod,
};

