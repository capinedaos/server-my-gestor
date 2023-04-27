const express = require("express");

// Controllers
const {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../../controllers/talentManagement/employee.controller");

// Middlewares
const {
  createEmployeeValidators,
  employeeExists,
} = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const employeeRouter = express.Router();

employeeRouter.use(protectSession);

employeeRouter.get("/", getAllEmployee);

employeeRouter.use(userAdmin);

employeeRouter.post("/", createEmployeeValidators, createEmployee);

employeeRouter
  .use("/:id", employeeExists)
  .route("/:id")
  .get(getEmployeeById)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = { employeeRouter };
