const { db, DataTypes } = require('../../utils/database.util');

// Create our first model (table)
const LoanMoney = db.define('loanMoney', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installmentValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  outlayDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  personAuthorizes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
});

module.exports = { LoanMoney };
