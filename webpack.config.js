let webpack = require('webpack');
let SimpleProgressPlugin = require('webpack-simple-progress-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

const ENV = process.env.NODE_ENV || "development";

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: __dirname + "/dist/",
        filename: "[name].js",
        library: "[name]"
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ["*", ".ts", ".js"]
    },
    resolveLoader: {
        modules: ["node_modules"],
        moduleExtensions: ['-loader'],
        extensions: ["*", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!resolve-url!sass-loader?sourceMap"
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: "file-loader",
                options: {
                    name: "../dist/assets/[name].[hash].[ext]"
                }
            },
            {
                test: /index\.html$/,
                loader: 'html-loader',
                options: {
                    name: "../dist/index.html"
                }
            }
        ]
    },
    watch: ENV == "development" ? true : false,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: ENV == "development" ? "eval" : "null",
    plugins: [
        new SimpleProgressPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(ENV),
            LANG: "RU"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2
        }),
        // new LiveReloadPlugin()
    ],
    devServer: {
        host: "localhost",
        port: "8040"
    }
};

// if (ENV != "development" || true) {
//     module.exports.plugins.push(
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false,
//                 drop_console: true,
//                 unsafe: true
//             }
//         })
//     );
// }