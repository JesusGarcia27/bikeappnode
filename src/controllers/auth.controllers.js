const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const theUserExists = await User.findOne({
    where: {
      email,
    },
  });

  if (theUserExists) {
    return res.status(404).json({
      status: 'error',
      message: 'You are trying to duplicate an existing user',
    });
  }

  const salt = await bcrypt.genSalt(12);
  const excryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: excryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //Nos traemos la informacion
  const { email, password } = req.body;

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

  //validar la password
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorrect email or password`, 401));
  }

  //crear el token
  const token = await generateJWT(user.id);

  //enviar la respuesta
  res.status(200).json({
    status: 'success',
    message: 'The user has successfully logged in 💟',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
