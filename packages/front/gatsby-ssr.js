const React = require('react');

const GifyuPreconnect = (
  <link
    key="imgdb"
    rel="preconnect"
    href="https://i.ibb.co"
  />
);

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    GifyuPreconnect,
  ]); 
};
