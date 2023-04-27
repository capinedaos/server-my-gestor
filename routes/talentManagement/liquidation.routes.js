const express = require("express");

// Controllers
const {
  createLiquidation,
  getAllLiquidation,
  getLiquidationById,
  updateLiquidation,
  deleteLiquidation,
} = require("../../controllers/talentManagement/liquidation.controller");

// Middlewares
const {
  createLiquidationValidators,
  liquidationExists,
  employeeExists,
  contractExists,
} = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const liquidationRouter = express.Router();

liquidationRouter.use(protectSession);

liquidationRouter.get("/", getAllLiquidation);

liquidationRouter.use(userAdmin);

liquidationRouter.post(
  "/",
  createLiquidationValidators,
  // employeeExists,
  //  contractExists,
  createLiquidation
);

liquidationRouter
  .use("/:id", liquidationExists)
  .route("/:id")
  .get(getLiquidationById)
  .patch(updateLiquidation)
  .delete(deleteLiquidation);

module.exports = { liquidationRouter };
