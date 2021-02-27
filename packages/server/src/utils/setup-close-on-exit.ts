import * as http from 'http';
import logger from 'loglevel';

export function setupCloseOnExit(server: http.Server) {
  const exitHandler = (options: { exit?: boolean }) => () => {
    server.close((err) => {
      if (err) {
        logger.warn('Something went wrong closing the server', err.stack);
      }

      logger.info('Server successfully closed');

      if (options.exit) process.exit();
    });
  };

  // do something when app is closing
  process.on('exit', exitHandler({ exit: false }));

  // catches ctrl+c event
  process.on('SIGINT', exitHandler({ exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler({ exit: true }));
  process.on('SIGUSR2', exitHandler({ exit: true }));

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler({ exit: true }));
}
