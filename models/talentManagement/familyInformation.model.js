const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const FamilyInformation = db.define("familyInformation", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  maritalStatus: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  dependents: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  numberOfChildren: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  ageOfChildren: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  emergencyNumber: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  typeOfHousing: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  socialStratum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { FamilyInformation };
