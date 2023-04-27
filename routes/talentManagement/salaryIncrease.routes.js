const express = require("express");

// Controllers
const {
  createsalaryIncrease,
  getAllSalaryIncrease,
  updateSalaryIncrease,
  deleteSalaryIncrease,
  getSalaryIncreaseByEmployeeId,
} = require("../../controllers/talentManagement/salaryIncrease.controller");

// Middlewares
const {
  createSalaryIncreaseValidators,
  salaryIncreaseExists,
  employeeExists,
  contractExists,
} = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const salaryIncreaseRouter = express.Router();

salaryIncreaseRouter.use(protectSession);

salaryIncreaseRouter.get(
  "/employee/:employeeId",
  getSalaryIncreaseByEmployeeId
);

salaryIncreaseRouter.use(userAdmin);

salaryIncreaseRouter.post(
  "/",
  createSalaryIncreaseValidators,
  createsalaryIncrease
);

salaryIncreaseRouter
  .use("/:id", salaryIncreaseExists)
  .route("/:id")
  .patch(updateSalaryIncrease)
  .delete(deleteSalaryIncrease);

module.exports = { salaryIncreaseRouter };
