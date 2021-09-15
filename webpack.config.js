const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const latagroup = false;
const devMode =
  latagroup ||
  process.argv[process.argv.indexOf('--mode') + 1] ===
    'development';

const landings = ['index', 'productos'];

const HTML = {
  test: /.pug$/,
  use: [
    {
      loader: 'html-loader',
    },
    {
      loader: 'pug-html-loader',
    },
  ],
};

const CSS = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ],
};

const JS = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    devServer: {
      open: true,
    },
    module: {
      rules: [HTML, CSS, JS],
    },
    plugins: [
      ...landings.map(
        (x) =>
          new HtmlWebpackPlugin({
            filename: `${x}.html`,
            template: `./src/pug/${x}.pug`,
            inject: 'body',
          })
      ),
      new MiniCssExtractPlugin(),
      new BeautifyHtmlWebpackPlugin(),
    ],
  };
};
module.exports = (env, arvg) => config(arvg.mode);
