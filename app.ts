import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import Exception from './model/exception';
// import routes
import health from './routes/health';

const app = express();

// setup middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger(':method :url STATUS: :status CONTENT-LENGTH: :res[content-length] RESP-TIME: :response-time ms', {
  skip: (req, res) => req.baseUrl === '/health'
}));

// Add authentication
//const Auth = require('./routes/utils/auth');

// Routes that do not authenticate
app.use('/health', health);

// Routes that authenticate
//app.use('/example', Auth.authenticatedUser, example);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler for all functions
app.use(function (err: (HttpError | Exception), req: Request, res: Response, next: NextFunction) {
  if (err.status !== 404) { // 404 stack traces are dumb. Who cares
    console.log(err);
  }

  if(err instanceof Exception) { // meaning we made this error
    res.status(err.status).send(err.serverResponse());
  } else if (err.status === 404) {
    res.status(404).send({message: err.message || "Not found"});
  } else {
    res.status(err.status || 500).send({message: err.message || "Unexpected error"});
  }
});

export default app;
