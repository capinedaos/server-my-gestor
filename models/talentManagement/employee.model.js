const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const Employee = db.define("employee", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  names: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankAccount: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bloodTypes: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  rh: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  studies: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "activo",
  },
});

module.exports = { Employee };
