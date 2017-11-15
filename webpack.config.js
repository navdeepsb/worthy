/**
 * @author Navdeep Singh Bagga
 * @desc The config file for webpack to bundle various modules
 */

var webpack = require( "webpack" );

module.exports = {
    entry: "./index.jsx",
    output: {
        path: __dirname + "/public/js",
        filename: "app.js"
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    query: {
                        presets: [ "es2015", "react" ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                },{
                    loader: "sass-loader",
                    options: {
                        data: "@import './ui/common/_vars';"
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};