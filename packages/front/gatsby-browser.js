const { inspect } = require('@xstate/inspect');

exports.onClientEntry = () => {
  if (process.env.NODE_ENV === 'development') {
    inspect({
      iframe: false,
    });
  }
}
