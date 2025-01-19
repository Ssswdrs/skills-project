import express, { json, urlencoded } from 'express';
import NotFound from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import indexRouter from './routes/index.js';

import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

export default app;