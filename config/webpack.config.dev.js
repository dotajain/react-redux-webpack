// Configuring webpack for dev environment

const merge = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');
const webpack = require('webpack');
const path = require('path');


module.exports = merge(webpackCommon);