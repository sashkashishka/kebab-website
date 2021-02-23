/**
 * Implement Gatsby's Browser APIs in this file.
 * @see https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from 'Constants/theme';

export const wrapPageElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
);
