const AppError = require('../utils/appError');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in!, Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('The awner of this token is not longer available', 401)
    );
  }
  req.sessionUser = user;

  next();
});

exports.loginUser = catchAsync(async (req, res, next) => {
  //Nos traemos la informacion
  const { email } = req.body;

  //Buscar el usuario y mirar si existe
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }

  req.user = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (sessionUser.role === 'employee') {
    next();
  } else {
    if (user.id !== sessionUser.id) {
      return next(new AppError('Invalid credentials'));
    }
    next();
  }
});

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }

    next();
  };
};
