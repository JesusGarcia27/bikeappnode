const User = require('../models/user.model.js');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      status: 'success',
      message: 'Users was found successfully 🛩️',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😣',
    });
  }
};

exports.findClient = async (req, res) => {
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
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        status: 'available',
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id: ${id} not found! ⛔`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User found',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😣',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found ⛔`,
      });
    }

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      message: 'The user has been updated! 🫡',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! ⛔',
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found ⛔`,
      });
    }

    await user.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'success',
      message: 'The user has been deleted! 😭',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! ⛔',
    });
  }
};
