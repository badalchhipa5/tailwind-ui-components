import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(import.meta.dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(import.meta.dirname, "dist"),
    },
    port: 5000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: [
      "src/**/*.html",
      "src/**/*.css",
      "src/**/*.{png,jpg,jpeg,svg}",
    ],
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/email-subscribe", to: "email-subscribe" },
        { from: "src/image-gallery", to: "image-gallery" },
        { from: "src/login-modal", to: "login-modal" },
        { from: "src/pricing-cards", to: "pricing-cards" },
        { from: "src/product-modal", to: "product-modal" },
      ],
    }),
  ],
};
