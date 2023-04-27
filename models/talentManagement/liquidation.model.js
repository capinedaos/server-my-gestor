const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const Liquidation = db.define("liquidation", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  transportationAssistance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  liquidationBasis: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  initialDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  initialDateBonus: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finalDateBonus: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalDays: {
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
  unemploymentAssistance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unemploymentInterests: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  holidays: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalBonusDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  bonus: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalLiquidation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Liquidation };
