const express = require("express");

// Controllers
const {
  createHealthyLife,
  getAllHealthyLife,
  getHealthyLifeByEmployeeId,
  updateHealthyLife,
  deleteHealthyLife,
  getHealthyLifeById,
} = require("../../controllers/talentManagement/healthyLife.controller");

// Middlewares
const {
  createHealthyLifeValidators,
  healthyLifeExists,
  employeeExists,
} = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const healthyLifeRouter = express.Router();

healthyLifeRouter.use(protectSession);

healthyLifeRouter.get("/", getAllHealthyLife);

healthyLifeRouter.get("/employee/:employeeId", getHealthyLifeByEmployeeId);

healthyLifeRouter.use(userAdmin);

healthyLifeRouter.post(
  "/",
  createHealthyLifeValidators,
  employeeExists,
  createHealthyLife
);

healthyLifeRouter
  .use("/:id", healthyLifeExists)
  .route("/:id")
  .get(getHealthyLifeById)
  .patch(updateHealthyLife)
  .delete(deleteHealthyLife);

module.exports = { healthyLifeRouter };
