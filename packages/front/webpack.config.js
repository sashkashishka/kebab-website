const path = require('path');

module.exports = {
  devtool: process.env.NODE_ENV === 'development' 
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Img: path.resolve(__dirname, 'src/images'),
      Hooks: path.resolve(__dirname, 'src/hooks'),
      Static: path.resolve(__dirname, 'static'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Types: path.resolve(__dirname, 'src/types'),
      Styles: path.resolve(__dirname, 'src/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: require.resolve('astroturf/loader'),
            options: {
              extension: '.module.css',
              enableCssProp: true,
            },
          },
        ],
      },
    ],
  },
};

