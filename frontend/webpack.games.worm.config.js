const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: {
    worm: "./games/worm/src/index.ts",
  },
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist/games/worm"),
    port: 3002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "redish worm",
    }),
    new ModuleFederationPlugin({
      name: "worm",
      filename: "remoteEntry.js",
      library: { type: "var", name: "worm" },
      exposes: { "./game": "./games/worm/src/game" },
      shared: {},
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/games/worm"),
    clean: true,
  }
};
