const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader'
    },
    {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'base64-font-loader'
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
        }),
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader'
    },
];
