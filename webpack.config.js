const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  main: resolve(__dirname, './src'),
  build: resolve(__dirname, './build'),
  soruce: resolve(__dirname, './index.jsx'),
  publicPath: '/',
  nodeModulesPath: resolve(__dirname, 'node_modules')
}

const extractSass = new ExtractTextPlugin({
    filename: "[name].[hash].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true
});

const renderHTML = new HtmlWebpackPlugin({  // Also generate a index.html
  title: 'Getting Started with React, Redux, Webpack 2',
  filename: 'index.html',
  template: resolve(__dirname, './src/index.html'), // Load a custom template
});

const cleanDist = new CleanWebpackPlugin(['dist', 'build'], {
  root: __dirname,
  verbose: true,
  dry: false
});

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  context: paths.main,
  entry: {  // Here the application starts executing and webpack starts bundling
    main: [
      './js/index.jsx'
    ]
  },
  output: { // options related to how webpack emits results
    filename: '[name].bundle.[hash].js',
    path: paths.build,
    publicPath: paths.publicPath  // the url to the output directory resolved relative to the HTML page
  },
  module: { // configuration regarding modules
    rules: [  // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.[jsx|js]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "csso-loader"
          },{
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },{
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      paths.main
    ],
     extensions: [".js", ".json", ".jsx", ".css"]
    // extensions that are used
  },
  performance: {
    hints: 'warning'
  },
  devServer: {
    contentBase: paths.main,
    stats: 'minimal'
  },
  plugins: [
    cleanDist,
    extractSass,
    renderHTML
  ]
}