const express = require("express");

// Controllers
const {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");

// Middlewares
const { createCompanyValidators } = require("../middlewares/talentManagement");
const { companyExists } = require("../middlewares/company.middleware");
const { protectSession, userAdmin } = require("../middlewares/auth.middleware");

const companyRouter = express.Router();

companyRouter.use(protectSession);

companyRouter.get("/", getCompany);

companyRouter.use(userAdmin);

companyRouter.post("/", createCompanyValidators, createCompany);

companyRouter.patch("/:id", companyExists, updateCompany);

companyRouter.delete("/:id", companyExists, deleteCompany);

module.exports = { companyRouter };
