const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const EndowmentDelivery = db.define("endowmentDelivery", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pants: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  shirt: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  shod: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { EndowmentDelivery };
