const express = require("express");

// Controllers
const {
  createContract,
  getAllContract,
  getAllContractByEmployeeId,
  getContractActiveByEmployeeId,
  getContractById,
  updateContract,
  deleteContract,
} = require("../../controllers/talentManagement/contract.controller");

// Middlewares
const {
  createContractValidators,
  contractExists,
  employeeExists,
} = require("../../middlewares/talentManagement");
const { validateDate } = require("../../middlewares/validateDate.middleware");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const contractRouter = express.Router();

contractRouter.use(protectSession);

contractRouter.get("/", getAllContract);

contractRouter.get("/all/:employeeId", getAllContractByEmployeeId);

contractRouter.use(userAdmin);

contractRouter.post(
  "/",
  createContractValidators,
  validateDate,
  createContract
);

contractRouter
  .use("/:id", contractExists)
  .route("/:id")
  .get(getContractById)
  .patch(validateDate, updateContract)
  .delete(deleteContract);

module.exports = { contractRouter };
