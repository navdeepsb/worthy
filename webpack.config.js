/**
 * @author Navdeep Singh Bagga
 * @desc The config file for webpack to bundle various modules
 */

var path = require( "path" );
var webpack = require( "webpack" );
var LiveReloadPlugin = require( "webpack-livereload-plugin" );

module.exports = function() {
    console.log( "" );
    console.log( "Loading..." );
    console.log( "" );
    console.log( "While you wait, did you know Master Yoda's original name was supposed to be Minch Yoda?" );
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
                "_": path.resolve( __dirname, "./" ),
                "ui": path.resolve( __dirname, "ui/" ),
                "db": path.resolve( __dirname, "db/" )
            },
            extensions: [ ".js", ".jsx" ]
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
            new webpack.optimize.UglifyJsPlugin({}),
            new LiveReloadPlugin({
                host: "localhost",
                port: 35729
            })
        ]
    }
};