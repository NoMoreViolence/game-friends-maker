import * as dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';
import serverlessHttp = require('serverless-http');
import cors = require('cors');
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');
import router from '@routes';
import '@database';

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use('/api', router);

const run = serverlessHttp(app);

export { run };
