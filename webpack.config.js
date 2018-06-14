const environment = {
    DEV: "dev",
    PROD: "prod",
};

const webpack = require('webpack');

const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const YAML = require("yamljs");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractScss = new ExtractTextPlugin('styles.css');

module.exports = env => {
    const constants = JSON.stringify(YAML.load('./configuration.yml'));
    const ENV = env.NODE_ENV || environment.DEV;

    const config = {
        entry: {
            bundle: "./src/index.ts"
        },
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
                {
                    test: /\.css$/,
                    loader: extractScss.extract({
                        fallback: "style-loader",
                        use: "style-loader!css-loader"
                    })
                },
                {
                    test: /\.s[ac]ss$/,
                    loader: extractScss.extract({
                        fallback: "style-loader",
                        use: "css-loader!resolve-url!sass-loader?sourceMap"
                    })
                },
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                    loader: "file-loader",
                    options: {
                        outputPath: __dirname + "/dist/assets/"
                    }
                },
                {
                    test: /index\.html$/,
                    loader: 'html-loader',
                    options: {
                        name: "../dist/index.html",
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }
            ]
        },
        watch: ENV === environment.DEV ? true : false,
        watchOptions: {
            aggregateTimeout: 100
        },
        devtool: ENV === environment.DEV ? "source-map" : "null",
        plugins: [
            extractScss,
            new SimpleProgressPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                LANG: "RU",
                environment: JSON.stringify(ENV),
                _environmentConstants: constants
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                minChunks: 2
            }),
            new CleanWebpackPlugin(["dist/*"], {}),
            new CopyWebpackPlugin([
                {
                    from: "**/*.html",
                    to: "./",
                    context: "./src/",
                    ignore: ["index.html"]
                },
                { from: "./src/index.html", to: "./index.html" },
                // { from: "assets/**/*", to: "./", context: "./src/" }
            ], {})
            // new LiveReloadPlugin()
        ],
        devServer: {
            host: "localhost",
            port: "8040"
        }
    };

    if (ENV !== environment.DEV) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                }
            })
        );
    }

    return config;
};