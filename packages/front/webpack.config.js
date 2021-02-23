const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Img: path.resolve(__dirname, 'src/images'),
      Hooks: path.resolve(__dirname, 'src/hooks'),
      Static: path.resolve(__dirname, 'static'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Types: path.resolve(__dirname, 'src/types'),
    },
  },
};
