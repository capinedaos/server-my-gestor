const express = require("express");

// Controllers
const {
  createUnfitness,
  getAllUnfitness,
  getUnfitnessById,
  updateUnfitness,
  deleteUnfitness,
} = require("../../controllers/talentManagement/unfitness.controller");

// Middlewares
const {
  createUnfitnessValidators,
  unfitnessExists,
  employeeExists,
} = require("../../middlewares/talentManagement");
const { validateDate } = require("../../middlewares/validateDate.middleware");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const unfitnessRouter = express.Router();

unfitnessRouter.use(protectSession);

unfitnessRouter.get("/", getAllUnfitness);

unfitnessRouter.use(userAdmin);

unfitnessRouter.post(
  "/",
  createUnfitnessValidators,
  validateDate,
  employeeExists,
  createUnfitness
);

unfitnessRouter
  .use("/:id", unfitnessExists)
  .route("/:id")
  .get(getUnfitnessById)
  .patch(updateUnfitness)
  .delete(deleteUnfitness);

module.exports = { unfitnessRouter };
