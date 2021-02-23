/**
 * Implement Gatsby's Node APIs in this file.
 * @see https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const webpackConfig = require('./webpack.config');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(webpackConfig);
};


/**
 * @param {Object} data
 * @param {Object} data.page
 * @param {string} data.page.componentPath
 * @param {Object} actions
 * @returns {Promise<unknown>}
 */
exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions;

  return new Promise((resolve) => {
    if (path.resolve(page.componentPath) === path.resolve(`${__dirname}/src/pages/index/index.tsx`)) {
      deletePage(page);

      /**
       * @see https://www.gatsbyjs.org/docs/actions/#createPage
       */
      createPage({
        ...page,
        path: '/',
        matchPath: '/',
      });
    }

    resolve();
  });
};
