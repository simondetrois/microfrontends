const path = require('path');

module.exports = {
  entry: {
    "crmusercomponents": "./src/index.js"
  },
  output: {
    filename: 'crmusercomponents.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
