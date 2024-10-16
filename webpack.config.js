const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { title } = require("process");

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === "development";

    return {
        entry: "./src/main.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
        },
        // devtool: "eval-sourse-map",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: "/node_modules/",
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }]
                },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: "/node_modules",
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                templateParameters: {
                    title: "Shapeshifter 3D Module Project"
                },
            })
        ]
    }
};