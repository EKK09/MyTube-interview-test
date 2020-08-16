const  ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const appName = "myTube";

let apiKey = '';

if (process.env.API_KEY) {
    apiKey = process.env.API_KEY;
} else {
    apiKey = require('./buildConfig.js');
}

module.exports = {
    mode: "none",

    entry: {
        [appName]: [
            "./app/ts/" + appName + ".tsx",
            "./app/scss/" + appName + ".scss"
        ]
    },

    output: {
        path: __dirname + "/public/js",
        filename: "[name].bundle.js"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("../css/[name].bundle.css"),
        new webpack.DefinePlugin({
            API_KEY: JSON.stringify(apiKey),
        }),
    ]
};