const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controllers');

//Routes
const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repairs.routes');

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
