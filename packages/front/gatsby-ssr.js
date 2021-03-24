const React = require('react');

const GifyuPreconnect = (
  <link
    key="gifyu"
    rel="preconnect"
    href="https://s4.gifyu.com"
  />
);

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    GifyuPreconnect,
  ]); 
};
