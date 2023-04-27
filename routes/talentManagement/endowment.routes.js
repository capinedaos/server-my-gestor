const express = require("express");

// Controllers
const {
  createEndowment,
  getAllEndowment,
  getEndowmentByEmployeeId,
  updateEndowment,
  deleteEndowment,
  getEndowmentById,
} = require("../../controllers/talentManagement/endowment.controller");

// Middlewares
const {
  createEndowmentValidators,
  endowmentExists,
  employeeExists,
} = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const endowmentRouter = express.Router();

endowmentRouter.use(protectSession);

endowmentRouter.get("/", getAllEndowment);

endowmentRouter.get("/employee/:employeeId", getEndowmentByEmployeeId);

endowmentRouter.use(userAdmin);

endowmentRouter.post(
  "/",
  createEndowmentValidators,
  employeeExists,
  createEndowment
);

endowmentRouter
  .use("/:id", endowmentExists)
  .route("/:id")
  .get(getEndowmentById)
  .patch(updateEndowment)
  .delete(deleteEndowment);

module.exports = { endowmentRouter };
