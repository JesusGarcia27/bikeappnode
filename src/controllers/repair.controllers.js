const Repair = require('../models/repairs.model');

exports.pendingBikes = async (req, res) => {
  try {
    const pendingRepairs = await Repair.findAll();

    res.json(pendingRepairs);
  } catch (error) {
    res.status(500).json({
      error: 'An error ocurred while fetching pending repairs',
    });
  }
};

exports.diary = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repair.create({
      date: date,
      userId: userId,
    });

    res.status(201).json({
      message: 'Appointment created successfully',
      repair: newRepair,
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error ocurred while creating the appointment',
    });
  }
};

exports.getPendingBikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const pendingRepair = await Repair.findOne({
      where: {
        status: 'pending',
        id: id,
      },
    });

    if (pendingRepair) {
      return res.json(pendingRepair);
    } else {
      return res.status(404).json({
        error: 'Pending repair not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'An error ocurred while fetching the pending repair',
    });
  }
};

exports.completed = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findByPk(id);
    if (!repair) {
      return res.status(404).json({
        error: 'Repair not found',
      });
    }

    repair.status = 'completed';
    await repair.save();

    res.json({
      message: 'Repair status updated to "completed"',
      repair: repair,
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while updating the repair status',
    });
  }
};

exports.cancelled = async (req, res) => {
  const { id } = req.params;

  try {
    const repair = await Repair.findByPk(id);

    if (!repair) {
      return res.status(404).json({
        error: 'Repair not found',
      });
    }

    repair.status = 'cancelled';
    await repair.save();

    res.json({
      message: 'Repair canceled successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error ocurred while canceling the repair',
    });
  }
};
