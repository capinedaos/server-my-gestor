const { db, DataTypes } = require("../../utils/database.util");

// Create our first model (table)
const EmployeePayroll = db.define("employeePayroll", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  currentTransportation: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  bankAccount: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payrollDays: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  workedDays: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  transportationAssistance: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  daysUnfitnessGeneral: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  disabilityValue: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  daysUnfitnessWorking: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  daysOfAbsence: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  daysOfLicence: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  daysOfSuspension: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hDiurnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalDiurnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hNocturnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalNocturnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hDiurnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalDiurnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hNocturnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalNocturnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hFestiveDiurnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalFestiveDiurnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hFestiveNocturnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalFestiveNocturnalBasic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hFestiveDiurnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalFestiveDiurnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hFestiveNocturnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalFestiveNocturnalExtra: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hCompensated: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalCompensatory: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalAccrued: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  pension: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  deductionAbsence: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  deductionLicense: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  deductionSuspension: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  deductionLoanMoney: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  otherDeductions: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalDeductions: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  netPayable: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  overallPayrollId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "activo",
  },
});

module.exports = { EmployeePayroll };
