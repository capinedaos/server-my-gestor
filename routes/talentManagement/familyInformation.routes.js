const express = require("express");

// Controllers
const {
  createFamilyInformation,
  getAllFamilyInformation,
  getFamilyInformationByEmployeeId,
  updateFamilyInformation,
  deleteFamilyInformation,
  getFamilyInformationById,
} = require("../../controllers/talentManagement/familyInformation.controller");

// Middlewares
const {
  createFamilyInformationValidators,
  familyInformationExists,
  employeeExists,
} = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const familyInformationRouter = express.Router();

familyInformationRouter.use(protectSession);

familyInformationRouter.get("/", getAllFamilyInformation);

familyInformationRouter.get(
  "/employee/:employeeId",
  getFamilyInformationByEmployeeId
);

familyInformationRouter.use(userAdmin);

familyInformationRouter.post(
  "/",
  createFamilyInformationValidators,
  employeeExists,
  createFamilyInformation
);

familyInformationRouter
  .use("/:id", familyInformationExists)
  .route("/:id")
  .get(getFamilyInformationById)
  .patch(updateFamilyInformation)
  .delete(deleteFamilyInformation);

module.exports = { familyInformationRouter };
