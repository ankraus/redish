import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { container, Configuration } from "webpack";
import ExternalTemplateRemotesPlugin from "external-remotes-plugin";
import "webpack-dev-server";

const config: Configuration = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
  },
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist/frame"),
    port: 3001,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "redish Games",
    }),
    new container.ModuleFederationPlugin({
      name: "frame",
      remotes: {
        worm: "worm@[wormGameUrl]/remoteEntry.js",
      },
      shared: {},
    }),
    new ExternalTemplateRemotesPlugin(),
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
    path: path.resolve(__dirname, "dist/frame"),
    clean: true,
  },
};

export default config;
