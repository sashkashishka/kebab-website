const { createProxyMiddleware } = require('http-proxy-middleware');
/**
 * @see https://nodejs.org/api/cli.html#cli_node_tls_reject_unauthorized_value
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * @see https://www.gatsbyjs.org/docs/telemetry/
 */
process.env.GATSBY_TELEMETRY_DISABLED = '1';

const getPlugins = () => {
  const plugins = [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'react', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [
          '/days/*',
          '/profile/*',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        limit: 0,
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Teach Me - Онлайн вправи',
        short_name: 'Teach Me',
        start_url: '/',
        background_color: '#FFC715',
        theme_color: '#FFC715',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    /**
     * @NOTE do not reorder manifest and offline plugins
     * @see https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
     */
    // 'gatsby-plugin-offline',
    /**
     * @NOTE provide fonts from design
     */
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: [
              '400',
              '400i',
              '500',
              '700',
            ],
          },
          {
            family: 'Poppins',
            variants: [
              '700',
            ],
          },
          {
            family: 'Roboto Slab',
            variants: [
              '400',
              '500',
            ],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.jsx?$|\.tsx?$/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ];

  if (process.env.BUNDLE) {
    plugins.push({
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        analyzerMode: 'static',
      },
    });
  }

  return plugins;
};


module.exports = {
  /**
   * @NOTE customize due to website requirements
   */
  siteMetadata: {
    title: 'Teach Me tasks',
    siteUrl: 'https://teme.com.ua',
  },

  plugins: getPlugins(),

  developMiddleware: (app) => {
    app.use([
      '/api/*',
    ], createProxyMiddleware({
      target: 'http://localhost:3000',
      timeout: 30000,
      changeOrigin: true,
      secure: false,
    }));
  },
};
