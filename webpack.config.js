const webpack = require('webpack');

module.exports =  {
  mode: 'development',
  entry: './app/index.jsx',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};
