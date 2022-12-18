const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Path en donde están las vistas en PUG
const views_path = './src/pug';

// Listado de paginas Pug que se renderizarán a HTML
const landings = [
  {
    filename: 'index',
    template: `${views_path}/index.pug`
  },
  {
    filename: 'productos',
    template: `${views_path}/productos.pug`
  }
];

const HTML = {
  test: /.pug$/,
  use: [
    {
      loader: 'html-loader'
    },
    {
      loader: 'pug-html-loader'
    }
  ]
};

const CSS = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader'
  ]
};

const JS = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
};

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    devServer: {
      open: true
    },
    module: {
      rules: [HTML, CSS, JS]
    },
    plugins: [
      ...landings.map(
        ({ filename, template }) =>
          new HtmlWebpackPlugin({
            filename: `${filename}.html`,
            template,
            inject: 'body',
            minify: false
          })
      ),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css'
      }),
      new BeautifyHtmlWebpackPlugin()
    ]
  };
};
module.exports = (env, arvg) => config(arvg.mode);
