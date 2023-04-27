const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const BonusService = db.define("bonusService", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  initialDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  daysNotWorked: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  baseTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  averageSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  transportationAssistance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  netPayable: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { BonusService };
