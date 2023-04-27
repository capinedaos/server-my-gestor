const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const SocialSecurity = db.define("socialSecurity", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  arl: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  compensationBox: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  eps: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  afp: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { SocialSecurity };
