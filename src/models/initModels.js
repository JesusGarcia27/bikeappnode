const User = require('../models/user.model');
const Repairs = require('../models/repairs.model');

const initModel = () => {
  User.hasMany(Repairs, { foreignKey: 'userId' });
  Repairs.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModel;
