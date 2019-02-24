const path = require('path');
const slsw = require('serverless-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            parallel:true,
            cache: true,
            sourceMap: false,
            uglifyOptions: {
                ecma: 8,
                mangle: false,
                compress: {
                  warnings: false
                }
            },
        })
    ],
  },
  module: {
    rules: [
      // all files with a .ts or .tsx extension will be handled by ts-loader
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};