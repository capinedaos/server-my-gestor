const { bonusServiceExists } = require("./bonusService.middleware");
const { contractExists } = require("./contract.middleware");
const { employeeExists } = require("./employee.middleware");
const { employeePayrollExists } = require("./employeePayroll.middleware");
const { endowmentExists } = require("./endowment.middleware");
const { endowmentDeliveryExists } = require("./endowmentDelivery.middleware");
const { extensionExists } = require("./extension.middleware");
const { familyInformationExists } = require("./familyInformation.middleware");
const { healthyLifeExists } = require("./healthyLife.middleware");
const { liquidationExists } = require("./liquidation.middleware");
const { loanMoneyExists } = require("./loanMoney.middleware");
const { missingWorkExists } = require("./missingWork.middleware");
const { overallPayrollExists } = require("./overallPayroll.middleware");
const { payInMoneyExists } = require("./payInMoney.middleware");
const { salaryIncreaseExists } = require("./salaryIncrease.middleware");
const { socialSecurityExists } = require("./socialSecurity.middleware");
const { unfitnessExists } = require("./unfitness.middleware");
const {
  createUserValidators,
  createCompanyValidators,
  createEmployeeValidators,
  createContractValidators,
  createExtensionValidators,
  createEmployeePayrollValidators,
  createOverallPayrollValidators,
  createLoanMoneyValidators,
  createMissingWorkValidators,
  createUnfitnessValidators,
  createLiquidationValidators,
  createSalaryIncreaseValidators,
  createBonusServiceValidators,
  createSocialSecurityValidators,
  createEndowmentValidators,
  createEndowmentDeliveryValidators,
  createHealthyLifeValidators,
  createFamilyInformationValidators,
} = require("./validators.middleware");

module.exports = {
  bonusServiceExists,
  contractExists,
  employeeExists,
  employeePayrollExists,
  endowmentExists,
  endowmentDeliveryExists,
  extensionExists,
  familyInformationExists,
  healthyLifeExists,
  liquidationExists,
  loanMoneyExists,
  missingWorkExists,
  overallPayrollExists,
  payInMoneyExists,
  salaryIncreaseExists,
  socialSecurityExists,
  unfitnessExists,
  createUserValidators,
  createCompanyValidators,
  createEmployeeValidators,
  createContractValidators,
  createExtensionValidators,
  createEmployeePayrollValidators,
  createOverallPayrollValidators,
  createLoanMoneyValidators,
  createMissingWorkValidators,
  createUnfitnessValidators,
  createLiquidationValidators,
  createSalaryIncreaseValidators,
  createBonusServiceValidators,
  createSocialSecurityValidators,
  createEndowmentValidators,
  createEndowmentDeliveryValidators,
  createHealthyLifeValidators,
  createFamilyInformationValidators,
};
