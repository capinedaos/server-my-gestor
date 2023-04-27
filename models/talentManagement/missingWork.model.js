const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const MissingWork = db.define("missingWork", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observation: {
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
  paidOut: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { MissingWork };
