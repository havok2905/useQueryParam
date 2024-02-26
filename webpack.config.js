const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './example/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'example/dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html'
    }
  )],
  devServer: {
    client: {
      overlay: false
    },
    static: {
      directory: path.join(__dirname, 'example')
    },
    compress: true,
    port: 9000
  }
};
