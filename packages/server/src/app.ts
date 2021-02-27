import path from 'path';
import express, {
  Express,
  Router,
} from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import logger from 'loglevel';

import { errorMiddleware } from './middlewares';
import { setupCloseOnExit } from './utils';

interface ServerOptions {
  getRoutes(): Router;
  env: {
    PORT?: string;
    GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
    GOOGLE_PRIVATE_KEY?: string;
  }
}

export class Server {
  public app: Express;

  private getRoutes: ServerOptions['getRoutes'];

  private env: ServerOptions['env'];

  constructor(options: ServerOptions) {
    const {
      getRoutes,
      env,
    } = options;

    this.app = express();

    this.getRoutes = getRoutes;
    this.env = env;
  }

  private async initMiddlewares() {
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(errorMiddleware);
  }

  private async initApi() {
    this.app.use('/api', this.getRoutes());
  }

  private async serveStatic() {
    this.app.use(express.static(path.resolve(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? 'public'
        : '../public',
    )));
  }

  private async setCachePolicy(): Promise<void> {
    this.app.use((req, res, next) => {
      const { path: urlPath } = req;
      const { ext } = path.parse(urlPath);

      switch (ext) {
        case ('.json'):
        case ('.html'): {
          res.setHeader('Cache-control', 'public, max-age=0, must-revalidate');
          break;
        }

        case ('.css'):
        case ('.js'):
        default: {
          if (urlPath.match('sw.js') || urlPath === '/') {
            res.setHeader('Cache-control', 'public, max-age=0, must-revalidate');
          } else {
            res.setHeader('Cache-control', 'public, max-age=31536000, immutable');
          }
        }
      }

      next();
    });
  }

  public async start() {
    // await this.connectDB();
    await this.initMiddlewares();
    await this.initApi();
    await this.setCachePolicy();
    await this.serveStatic();

    const server = this.app.listen(this.env.PORT, () => {
      logger.info(`Kebab app listeting port ${this.env.PORT}`);
    });

    setupCloseOnExit(server);
  }
}
