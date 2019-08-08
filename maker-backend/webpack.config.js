const fs = require('fs');
const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  ...(!slsw.lib.webpack.isLocal ? {
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true, // Enable/disable multi-process parallel running.
        }),
      ],
    }
  } : {}),
  // plugins: [
  //   new CompressionPlugin({
  //     compressionOptions: {
  //       numiterations: 15,
  //     },
  //     algorithm(input, compressionOptions, callback) {
  //       return zopfli.gzip(input, compressionOptions, callback);
  //     },
  //   }),
  // ],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.mjs'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'eslint-loader'],
      },
    ],
  },
};
