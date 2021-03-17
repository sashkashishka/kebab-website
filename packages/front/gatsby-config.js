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
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
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
        name: 'Эль шейх - идеальная шаурма',
        short_name: 'Эль шейх',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/logo.svg',
      },
    },
    /**
     * @NOTE do not reorder manifest and offline plugins
     * @see https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
     */
    'gatsby-plugin-offline',
    // TODO change proxima nova font or download it
    // {
    //   resolve: 'gatsby-plugin-prefetch-google-fonts',
    //   options: {
    //     fonts: [
    //       {
    //         family: 'Proxima Nova',
    //         variants: [
    //           '600',
    //           '800',
    //         ],
    //       },
    //     ],
    //   },
    // },
  ];

  return plugins;
};


module.exports = {
  siteMetadata: {
    title: 'Эль шейх - идеальная шаурма',
    // TODO use other url
    siteUrl: 'https://el-sheikh.herokuapp.com',
    tiktok: '#',
    instagram: '#',
    telegram: '#',
    phone: '+38 068 835 29 96',
    address: 'Чапаева 10Б (МОД/ЖТК)',
    addressExtended: `
      Ул. Чапаева 10б
      (Територия колледжа МОД/ЖТК)
    `,
  },

  plugins: getPlugins(),

  developMiddleware: (app) => {
    app.use([
      '/api/*',
    ], createProxyMiddleware({
      target: 'http://localhost:7000',
      timeout: 30000,
      changeOrigin: true,
      secure: false,
    }));
  },
};
