import express, { Application } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from '@routes';
import { databaseConnect } from '@database';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectDefaultMiddleware();
  }

  public ensureDb = (): Promise<void> =>
    new Promise((resolve, reject) => {
      let counter = 0;

      const tryConnect = async () => {
        const db = await databaseConnect();
        if (db.success === true) {
          return resolve();
        }

        counter++;
        console.log(`db connection failed ${counter}`);

        if (counter > 2) {
          return reject(new Error('Failed after 2 retries'));
        }

        setTimeout(tryConnect, 10);
      };

      return tryConnect();
    });

  public connectDefaultMiddleware = (): void => {
    const { app } = this;
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(async (req, res, next) => {
      try {
        await this.ensureDb();
        return next();
      } catch (e) {
        return res.status(500).json({
          OMG: 'SERVER IS DEAD',
          message: 'Database Connection Error',
        });
      }
    });
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use('/api', router);
  };

  public serverless = () => {
    const { app } = this;
    return serverless(app);
  };
}

export { Server };
