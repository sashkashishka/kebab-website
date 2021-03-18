const path = require('path');

module.exports = {
  devtool: process.env.NODE_ENV === 'development' 
    ? 'eval-source-map'
    : 'source-map',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Hooks: path.resolve(__dirname, 'src/hooks'),
      Img: path.resolve(__dirname, 'src/images'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Styles: path.resolve(__dirname, 'src/styles'),
      Services: path.resolve(__dirname, 'src/services'),
      Machines: path.resolve(__dirname, 'src/machines'),
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

