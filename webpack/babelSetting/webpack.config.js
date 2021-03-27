const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: ['@babel/polyfill','./src/js/main.js','./src/sass/main.scss'],

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.css' })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src/js')
          ],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ],
            exclude: /node_modules/
        }
      ]
    },

    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
  };