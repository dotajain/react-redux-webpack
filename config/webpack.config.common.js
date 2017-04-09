// Configuring webpack for all environments

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    // Here the application starts executing
    // and webpack starts bundling
    app: [
      './index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'), // the target directory for all output files
    filename: '[name].bundle.[hash].js' // the filename template for entry chunks
  }
};
