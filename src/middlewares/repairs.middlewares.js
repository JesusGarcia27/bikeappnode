const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email', 'role'],
      },
    ],
  });

  if (!repair) {
    const repairMade = await Repair.findOne({
      where: {
        status: 'completed',
        id,
      },
    });

    if (repairMade) {
      return res.status(404).json({
        status: 'error',
        message: 'Unable to complete cancellation',
      });
    }
    return next(new AppError(`Repair with id: ${id} not found`, 404));
  }

  req.user = repair.user;
  req.repair = repair;
  next();
});
