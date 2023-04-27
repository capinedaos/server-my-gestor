const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const HealthyLife = db.define("healthyLife", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  hobby: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  alcoholConsumption: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  tobaccoUse: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  sports: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  conveyance: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  allergyMedicine: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  diseases: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  operations: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  medicines: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { HealthyLife };
