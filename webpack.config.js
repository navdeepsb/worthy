/**
 * @author Navdeep Singh Bagga
 * @desc The config file for webpack to bundle various modules
 */

var path = require( "path" );
var webpack = require( "webpack" );

module.exports = function() {
    console.log( "" );
    console.log( "Loading..." );
    console.log( "" );
    console.log( "While you wait, did you know Master Yoda's original name would have been Minch Yoda?" );
    console.log( "" );
    console.log( "@navdeepsb" );
    console.log( "" );

    return {
        entry: "./index.jsx",
        output: {
            path: path.resolve( __dirname, "public/js/" ),
            filename: "app.js"
        },
        resolve: {
            alias: {
                "ui": path.resolve( __dirname, "ui/" ),
                "db": path.resolve( __dirname, "db/" )
            }
        },
        devtool: "eval-source-map",
        stats: "normal",
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
            new webpack.optimize.UglifyJsPlugin({})
        ]
    }
};