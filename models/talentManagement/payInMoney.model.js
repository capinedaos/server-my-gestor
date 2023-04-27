const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const PayInMoney = db.define("payInMoney", {
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
  deductionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  loanMoneyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { PayInMoney };
