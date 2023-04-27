// Models
const { User } = require("../user.model");
const { Company } = require("../company.model");
const { Employee } = require("./employee.model");
const { Contract } = require("./contract.model");
const { Extension } = require("./extension.model");
const { EmployeePayroll } = require("./employeePayroll.model");
const { LoanMoney } = require("./loanMoney.model");
const { PayInMoney } = require("./payInMoney.model");
const { MissingWork } = require("./missingWork.model");
const { Unfitness } = require("./unfitness.model");
const { SocialSecurity } = require("./socialSecurity.model");
const { Endowment } = require("./endowment.model");
const { EndowmentDelivery } = require("./endowmentDelivery.model");
const { HealthyLife } = require("./healthyLife.model");
const { Liquidation } = require("./liquidation.model");
const { BonusService } = require("./bonusService.model");
const { OverallPayroll } = require("./overallPayroll.model");
const { FamilyInformation } = require("./familyInformation.model");
const { SalaryIncrease } = require("./salaryIncrease.model");

const initModelsTalentManagement = () => {
  // 1 Employee --> M Contract
  Employee.hasMany(Contract, { foreignKey: "employeeId" });
  Contract.belongsTo(Employee);

  // 1 Contract --> M Extension
  Contract.hasMany(Extension, { foreignKey: "contractId" });
  Extension.belongsTo(Contract);

  // 1 Employee --> M Payroll
  Employee.hasMany(EmployeePayroll, { foreignKey: "employeeId" });
  EmployeePayroll.belongsTo(Employee);

  // 1 Employee --> M LoanMoney
  Employee.hasMany(LoanMoney, { foreignKey: "employeeId" });
  LoanMoney.belongsTo(Employee);

  // 1 LoanMoney --> M PayInMoney
  LoanMoney.hasMany(PayInMoney, { foreignKey: "loanMoneyId" });
  PayInMoney.belongsTo(LoanMoney);

  // 1 Employee --> M MissingWork
  Employee.hasMany(MissingWork, { foreignKey: "employeeId" });
  MissingWork.belongsTo(Employee);

  // 1 Employee --> M Liquidation
  Employee.hasMany(Liquidation, { foreignKey: "employeeId" });
  Liquidation.belongsTo(Employee);

  // 1 Employee --> M BonusService
  Employee.hasMany(BonusService, { foreignKey: "employeeId" });
  BonusService.belongsTo(Employee);

  // 1 OverallPayroll --> M EmployeePayroll
  OverallPayroll.hasMany(EmployeePayroll, { foreignKey: "overallPayrollId" });
  EmployeePayroll.belongsTo(OverallPayroll);

  // 1 Employee --> M Unfitness
  Employee.hasMany(Unfitness, { foreignKey: "employeeId" });
  Unfitness.belongsTo(Employee);

  // 1 Employee <----> 1 SocialSecurity
  Employee.hasOne(SocialSecurity, { foreignKey: { name: "employeeId" } });
  SocialSecurity.belongsTo(Employee);

  // 1 Employee <----> 1 Endowment
  Employee.hasOne(Endowment, { foreignKey: { name: "employeeId" } });
  Endowment.belongsTo(Employee);

  // 1 Employee --> M EndowmentDelivery
  Employee.hasMany(EndowmentDelivery, { foreignKey: "employeeId" });
  EndowmentDelivery.belongsTo(Employee);

  // 1 Employee <----> 1 HealthyLife
  Employee.hasOne(HealthyLife, { foreignKey: { name: "employeeId" } });
  HealthyLife.belongsTo(Employee);

  // 1 Employee <----> 1 FamilyInformation
  Employee.hasOne(FamilyInformation, { foreignKey: { name: "employeeId" } });
  FamilyInformation.belongsTo(Employee);

  // 1 Employee --> M SalaryIncrease
  Employee.hasMany(SalaryIncrease, { foreignKey: "employeeId" });
  SalaryIncrease.belongsTo(Employee);
};

module.exports = { initModelsTalentManagement };
