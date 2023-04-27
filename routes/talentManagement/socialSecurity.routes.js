const express = require("express");

// Controllers
const {
  createSocialSecurity,
  getAllSocialSecurity,
  getSocialSecurityEmployeeId,
  updateSocialSecurity,
  deleteSocialSecurity,
  getSocialSecurityById,
} = require("../../controllers/talentManagement/socialSecurity.controller");

// Middlewares
const {
  createSocialSecurityValidators,
  socialSecurityExists,
  employeeExists,
} = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const socialSecurityRouter = express.Router();

// socialSecurityRouter.use(protectSession);

socialSecurityRouter.get("/", getAllSocialSecurity);
socialSecurityRouter.get("/employee/:employeeId", getSocialSecurityEmployeeId);

// socialSecurityRouter.use(userAdmin);

socialSecurityRouter.post(
  "/",
  createSocialSecurityValidators,
  employeeExists,
  createSocialSecurity
);

socialSecurityRouter
  .use("/:id", socialSecurityExists)
  .route("/:id")
  .get(getSocialSecurityById)
  .patch(updateSocialSecurity)
  .delete(deleteSocialSecurity);

module.exports = { socialSecurityRouter };
