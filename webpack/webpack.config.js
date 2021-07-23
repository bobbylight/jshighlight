const loaders = require("./loaders");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const devBuild = process.env.NODE_ENV === 'dev';

// Loaders specific to compiling
loaders.push({
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    exclude: /node_modules/,
    options: {
        typeCheck: true
    }
});

module.exports = [{
    entry: {
        demo: [ path.resolve('./src/demo-app/index.ts') ]
    },
    output: {
        path: path.resolve('demo'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json', '.css' ],
        modules: [ 'src/app', 'src/demo-app', 'src/styles', 'node_modules' ]
    },
    devtool: 'source-map', //devBuild ? 'cheap-eval-source-map' : 'source-map',
    module: {
        loaders: loaders
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: '*.html', context: 'src/demo-app' }
        ]),
        new webpack.ProvidePlugin({
        })
    ]
}];

if (!devBuild) {
    module.exports[0].plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}
