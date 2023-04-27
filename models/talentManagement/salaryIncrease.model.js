const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const SalaryIncrease = db.define("salaryIncrease", {
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
  dateIncrease: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personAuthorizes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { SalaryIncrease };
