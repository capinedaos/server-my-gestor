const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const Extension = db.define("extension", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
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
  numberExtension: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  contractId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Extension };
