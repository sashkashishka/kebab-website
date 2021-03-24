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
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        cssLoaderOptions: {
          localIdentName: process.env.NODE_ENV === 'production'
            ? '[local]--[hash:base64:5]'
            : '[name]__[local]--[hash:base64:5]'
        },
      },
    },
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
  ];

  return plugins;
};


module.exports = {
  siteMetadata: {
    title: 'Ель шейх - ідеальна шаурма',
    // TODO use other url
    siteUrl: 'https://el-sheikh.herokuapp.com',
    tiktok: '#',
    instagram: '#',
    telegram: '#',
    phone: '+38 068 835 29 96',
    address: 'Чапаєва 10Б (МОД/ЖТК)',
    addressExtended: `
      Вул. Чапаєва 10б
      (Територія колледжу МОД/ЖТК)
    `,
    addressLink: 'https://www.google.com.ua/maps/place/%D0%A8%D0%B0%D1%83%D1%80%D0%BC%D0%B0+%D0%95%D0%BB%D1%8C+%D0%A8%D0%B5%D0%B9%D1%85/@50.2630893,28.6651277,16z/data=!4m13!1m7!3m6!1s0x472c64bf05eb02af:0xb040deee8b6864da!2zMTBBLCDQstGD0LvQuNGG0Y8g0KHRgtC10L_QsNC90LAg0JHQsNC90LTQtdGA0LgsIDEw0JAsIDEw0JEsINCW0LjRgtC-0LzQuNGALCDQltC40YLQvtC80LjRgNGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCAxMDAwMQ!3b1!8m2!3d50.2630453!4d28.6641683!3m4!1s0x472c65354d9c9a73:0xf1cd52c16117e2d1!8m2!3d50.2630453!4d28.6641683?hl=ru',
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
