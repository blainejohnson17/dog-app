const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @internal
 */
const ROOT_DIR = path.resolve('./');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

module.exports = {
  devtool: false,
  devServer: {
    open: true,
    openPage: 'index.html'
  },
  entry: {
    main: path.resolve(ROOT_DIR, 'src/index.js')
  },
  output: {
    path: path.resolve(ROOT_DIR, 'dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(ROOT_DIR, 'public/index.html'),
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', 'eslint-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [ 'style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader' ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                    removeXMLProcInst: true,
                    removeDoctype: true,
                    removeComments: true,
                    removeTitle: true
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: [
          /\.(woff|woff2|ttf|eot|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [ SRC_DIR, 'node_modules' ],
    extensions: [ '.js', '.jsx', '.scss' ]
  }
};
