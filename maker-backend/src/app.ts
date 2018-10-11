require('dotenv').config();
import * as express from 'express';
import * as http from 'http';
import { Application } from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as createError from 'http-errors';
import * as path from 'path';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import Router from './routes';
import sequelize from 'db';
import { SocketServer } from './socket/socket';

const app: Application = express();
const httpServer = new http.Server(app);
const socketServer = new SocketServer(httpServer); // Socket Server

process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : console.log('hello production');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false })); // Body parser
app.use(bodyParser.json()); // Body parser
app.use(cookieParser()); // Cookie parser
app.use(methodOverride('X-HTTP-Method-Override')); // Method-Override
app.use(helmet({ noCache: false })); // Security
app.use(express.static(path.join(__dirname, 'dist/maker-frontend'))); // Static Folder confing

app.use('/api', Router); // Router

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404)); // Error 404
});
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message; // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); // render the error page
  res.json({ success: false, message: 'Error !' });
});

// connect To DB
sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log('✓ DB connection success.');
  })
  .catch((err: Error) => {
    console.error(err.message);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

const port = process.env.port || 3000; // server open
httpServer.listen(port, () => {
  console.log(`✓ Server is running at http://localhost:${port}`);
});
