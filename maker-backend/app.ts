import * as express from 'express';
import { Application } from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as createError from 'http-errors';
import * as path from 'path';
import * as morgan from 'morgan';

const app: Application = express();

// body parser
app.use(morgan('dev')); // Dev
app.use(bodyParser.urlencoded({ extended: false })); // Body parser
app.use(bodyParser.json()); // Body parser
app.use(cookieParser()); // Cookie parser
app.use(methodOverride('X-HTTP-Method-Override')); // Method-Override
app.use(express.static(path.join(__dirname, 'dist/maker-frontend'))); // Static Folder confing

app.use('/', (req, res) => {
  res.json({
    success: 'first config success'
  });
});

// 404
app.use((req, res, next) => {
  next(createError(404));
});
// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// server open
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
