// Routers

const initRoutesTalentManagement = (app) => {
  const { contractRouter } = require("./contract.routes");
  const { employeeRouter } = require("./employee.routes");
  const { endowmentRouter } = require("./endowment.routes");
  const { endowmentDeliveryRouter } = require("./endowmentDelivery.routes");
  const { extensionRouter } = require("./extension.routes");
  const { familyInformationRouter } = require("./familyInformation.routes");
  const { healthyLifeRouter } = require("./healthyLife.routes");
  const { loanMoneyRouter } = require("./loanMoney.routes");
  const { missingWorkRouter } = require("./missingWork.routes");
  const { payInMoneyRouter } = require("./payInMoney.routes");
  const { employeePayrollRouter } = require("./employeePayroll.routes");
  const { socialSecurityRouter } = require("./socialSecurity.routes");
  const { unfitnessRouter } = require("./unfitness.routes");
  const { liquidationRouter } = require("./liquidation.routes");
  const { salaryIncreaseRouter } = require("./salaryIncrease.routes");
  const { bonusServiceRouter } = require("./bonusService.routes");
  const { overallPayrollRouter } = require("./overallPayroll.routes");

  // Define endpoints
  app.use("/api/v1/talent-management/contract", contractRouter);
  app.use("/api/v1/talent-management/employee", employeeRouter);
  app.use("/api/v1/talent-management/endowment", endowmentRouter);
  app.use(
    "/api/v1/talent-management/endowment-delivery",
    endowmentDeliveryRouter
  );
  app.use("/api/v1/talent-management/extension", extensionRouter);
  app.use(
    "/api/v1/talent-management/family-information",
    familyInformationRouter
  );
  app.use("/api/v1/talent-management/healthy-life", healthyLifeRouter);
  app.use("/api/v1/talent-management/loan-money", loanMoneyRouter);
  app.use("/api/v1/talent-management/missing-work", missingWorkRouter);
  app.use("/api/v1/talent-management/pay-in-money", payInMoneyRouter);
  app.use("/api/v1/talent-management/employee-payroll", employeePayrollRouter);
  app.use("/api/v1/talent-management/social-security", socialSecurityRouter);
  app.use("/api/v1/talent-management/unfitness", unfitnessRouter);
  app.use("/api/v1/talent-management/liquidation", liquidationRouter);
  app.use("/api/v1/talent-management/salary-increase", salaryIncreaseRouter);
  app.use("/api/v1/talent-management/bonus-service", bonusServiceRouter);
  app.use("/api/v1/talent-management/overall-payroll", overallPayrollRouter);
};

module.exports = { initRoutesTalentManagement };
