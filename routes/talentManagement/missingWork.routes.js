const express = require("express");

// Controllers
const {
  createMissingWork,
  getAllMissingWork,
  getMissingWorkById,
  updateMissingWork,
  deleteMissingWork,
} = require("../../controllers/talentManagement/missingWork.controller");

// Middlewares
const { missingWorkExists } = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const missingWorkRouter = express.Router();

missingWorkRouter.use(protectSession);

missingWorkRouter.get("/", getAllMissingWork);

missingWorkRouter.use(userAdmin);

missingWorkRouter.post("/", createMissingWork);

missingWorkRouter
  .use("/:id", missingWorkExists)
  .route("/:id")
  .get(getMissingWorkById)
  .patch(updateMissingWork)
  .delete(deleteMissingWork);

module.exports = { missingWorkRouter };
