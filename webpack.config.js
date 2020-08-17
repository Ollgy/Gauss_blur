const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),
  output: {
    filename: 'bundle.js',
    publicPath: "/dist/",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: {
            collapseWhitespace: true
        },
        template: 'index.html',
        hash: true
    })
  ],
  devServer: {
    //contentBase: path.resolve(__dirname),
    //compress: true,
    port: 9000,
    //watchContentBase: true,
    //progress: true
  }
}