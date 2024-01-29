const path = require('path');

module.exports = {
  entry: {
    "crmcoursecomponents": "./src/index.js"
  },
  output: {
    filename: 'crmcoursecomponents.js',
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
