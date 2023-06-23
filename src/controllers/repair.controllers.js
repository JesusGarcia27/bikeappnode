const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.pendingBikes = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    attributes: {
      exclude: ['status'],
    },
    include: [
      {
        model: User,
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

exports.newRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repair.create({
    date,
    motorsNumber: motorsNumber.toLowerCase(),
    description,
    userId: id,
  });

  res.status(201).json({
    message: 'Appointment created successfully 😃',
    repair,
  });
});

exports.getPendingBikeById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });
});

exports.completed = catchAsync(async (req, res, next) => {
  const { repair, user } = req;

  await repair.update({ status: 'completed' });

  res.json({
    status: 'success',
    message: 'Repair status updated to "completed" ✅',
    repair,
    user,
  });
});

exports.cancelled = catchAsync(async (req, res, next) => {
  const { repair } = req.params;

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: `repair with id: ${id} ha been cancelled`,
  });
});
