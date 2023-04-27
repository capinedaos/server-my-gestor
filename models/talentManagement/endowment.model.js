const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const Endowment = db.define("endowment", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  pants: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  shirt: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  shod: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Endowment };
