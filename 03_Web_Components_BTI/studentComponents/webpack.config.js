const path = require('path');

module.exports = {
  entry: {
    "crmstudentcomponents": "./src/index.js"
  },
  output: {
    filename: 'crmstudentcomponents.js',
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
