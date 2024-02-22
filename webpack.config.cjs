// // ESM import 구문
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
// import path from "path";
// import webpack from "webpack";

// // 환경 변수와 argv를 사용하기 위한 import 구문
// // 이 부분은 환경에 따라 달라질 수 있으며, ESM에서는 process를 직접 import 할 수 없습니다.
// // import process from "process";

// export default (env, argv) => {
//   const prod = argv.mode === "production";

//   return {
//     mode: prod ? "production" : "development",
//     devtool: prod ? "hidden-source-map" : "eval",
//     entry: "./src/index.tsx",
//     output: {
//       path: path.join(path.resolve(), "/dist"),
//       filename: "[name].js",
//     },
//     devServer: {
//       port: 3000,
//       hot: true,
//     },
//     resolve: {
//       extensions: [".js", ".jsx", ".ts", ".tsx"],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.tsx?$/,
//           use: ["babel-loader", "ts-loader"],
//         },
//       ],
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//         React: "react",
//       }),
//       new HtmlWebpackPlugin({
//         template: "./public/index.html",
//         minify: prod
//           ? {
//               collapseWhitespace: true, // 빈칸 제거
//               removeComments: true, // 주석 제거
//             }
//           : false,
//       }),
//       new CleanWebpackPlugin(),
//     ],
//   };
// };

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const prod = argv.mode === "production";

  return {
    mode: prod ? "production" : "development",
    devtool: prod ? "hidden-source-map" : "eval",
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify:
          process.env.NODE_ENV === "production"
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
