const express = require("express");

// Controllers
const {
  createExtension,
  getAllExtension,
  getExtensionById,
  updateExtension,
  deleteExtension,
} = require("../../controllers/talentManagement/extension.controller");

// Middlewares
const {
  createExtensionValidators,
  extensionExists,
  contractExists,
} = require("../../middlewares/talentManagement");
const { validateDate } = require("../../middlewares/validateDate.middleware");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const extensionRouter = express.Router();

extensionRouter.use(protectSession);

extensionRouter.get("/", getAllExtension);

extensionRouter.use(userAdmin);

extensionRouter.post(
  "/",
  createExtensionValidators,
  validateDate,
  contractExists,
  createExtension
);

extensionRouter
  .use("/:id", extensionExists)
  .route("/:id")
  .get(getExtensionById)
  .patch(updateExtension)
  .delete(deleteExtension);

module.exports = { extensionRouter };
