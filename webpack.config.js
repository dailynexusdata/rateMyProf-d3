const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/site/index.js',
  output: {
    filename: 'rate-my-prof-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'rate-my-prof',
      filename: '../index.html',
      template: 'src/site/index.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = () => config;
