const express = require("express");

// Controllers
const {
  createbonusService,
  getAllBonusService,
  updateBonusService,
  deleteBonusService,
  getBonusServiceById,
} = require("../../controllers/talentManagement/bonusService.controller");

// Middlewares
const {
  createBonusServiceValidators,
  bonusServiceExists,
  contractExists,
  employeeExists,
} = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const bonusServiceRouter = express.Router();

bonusServiceRouter.use(protectSession);

bonusServiceRouter.get("/", getAllBonusService);

bonusServiceRouter.use(userAdmin);

bonusServiceRouter.post(
  "/",
  createBonusServiceValidators,
  employeeExists,
  createbonusService
);

bonusServiceRouter
  .use("/:id", bonusServiceExists)
  .route("/:id")
  .get(getBonusServiceById)
  .patch(updateBonusService)
  .delete(deleteBonusService);

module.exports = { bonusServiceRouter };
