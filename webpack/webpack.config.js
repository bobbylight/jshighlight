const loaders = require("./loaders");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const devBuild = process.env.NODE_ENV === 'dev';
console.log(`Starting webpack build with NODE_ENV: ${process.env.NODE_ENV}`);

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
    mode: devBuild ? 'development' : 'production',
    devtool: 'source-map', //devBuild ? 'source-map' : undefined,
    module: {
        rules: loaders
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: '*.html', context: 'src/demo-app' }
            ]
        })
    ]
}];
