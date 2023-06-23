const User = require('../models/user.model.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: {
      exclude: ['status', 'password'],
    },
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

/* exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // verificar si ya existe un usuarui con el mismo correo electronico
    const existingUserByEmail = await User.findOne({
      where: { email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({
        status: 'error',
        message: 'A user with the same email already exists 😮',
      });
    }

    // crear un nuevo usuario
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      status: 'available',
      message: 'The user has been created! 😃',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😣',
    });
  }
}; */

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'User found',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated! 💨',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been deleted! 😭',
  });
});
