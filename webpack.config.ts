import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

type argvType = {
  mode: "development" | "production";
};

type envType = {
  [key: string]: string | boolean;
};

const COPYRIGHT = `Copyright (c) 2020 Parth Wadhwa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
`;

const DEFAULT_TYPESCRIPT_LOADER_RULE = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  exclude: /node_modules/,
};
const DEFAULT_URL_FILE_LOADER_RULE = {
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8192,
      },
    },
  ],
};

export default (env: envType, argv: argvType): webpack.Configuration => {
  const defaultConfig: webpack.Configuration = {
    context: __dirname,
    mode: argv.mode,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [DEFAULT_TYPESCRIPT_LOADER_RULE, DEFAULT_URL_FILE_LOADER_RULE],
    },
  };

  const devConfig: webpack.Configuration = {
    ...defaultConfig,
    module: {
      rules: [
        {
          ...DEFAULT_TYPESCRIPT_LOADER_RULE,
          options: {
            transpileOnly: true,
          },
        },
        DEFAULT_URL_FILE_LOADER_RULE,
      ],
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      hot: true,
      clientLogLevel: "silent",
      host: "0.0.0.0",
      port: 3000,
      open: true,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: __dirname + "/src/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };

  const prodConfig: webpack.Configuration = {
    ...defaultConfig,
    plugins: [
      new HTMLWebpackPlugin({
        template: __dirname + "/src/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new CleanWebpackPlugin({ verbose: true }),
      new webpack.BannerPlugin(COPYRIGHT),
    ],
  };
  console.log(JSON.stringify(devConfig));

  return argv.mode === "production" ? prodConfig : devConfig;
};
