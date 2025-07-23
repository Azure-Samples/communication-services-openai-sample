// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'build.js'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
          exclude: /dist/
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      compress: true,
      port: 3000,
      hot: true,
      client: {
        webSocketURL: 'auto://0.0.0.0:0/ws'
      },
      allowedHosts: 'all',
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        },
        '/token': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        },
        '/refreshToken': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        },
        '/getEndpointUrl': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        },
        '/createGroupCallWithAutomation': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        },
        '/callAutomationEvent': {
          target: 'http://[::1]:8080',
          changeOrigin: true
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: 'node_modules',
        fix: true
      })
    ],
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};
