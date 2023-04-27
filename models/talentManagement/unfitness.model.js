const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const Unfitness = db.define("unfitness", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diagnostic: {
    type: DataTypes.STRING,
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
  term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Unfitness };
