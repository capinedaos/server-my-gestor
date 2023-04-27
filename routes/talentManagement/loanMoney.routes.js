const express = require("express");

// Controllers
const {
  createLoanMoney,
  getAllLoanMoney,
  getLoanMoneyById,
  updateLoanMoney,
  payLoan,
  deleteLoanMoney,
} = require("../../controllers/talentManagement/loanMoney.controller");

// Middlewares
const {
  createLoanMoneyValidators,
  loanMoneyExists,
  employeeExists,
} = require("../../middlewares/talentManagement");

const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const loanMoneyRouter = express.Router();

// loanMoneyRouter.use(protectSession);

loanMoneyRouter.get("/", getAllLoanMoney);

// loanMoneyRouter.use(userAdmin);

loanMoneyRouter.post(
  "/",
  createLoanMoneyValidators,
  employeeExists,
  createLoanMoney
);

loanMoneyRouter.patch("/pay-loan/:id", loanMoneyExists, payLoan);

loanMoneyRouter
  .use("/:id", loanMoneyExists)
  .route("/:id")
  .get(getLoanMoneyById)
  .patch(updateLoanMoney)
  .delete(deleteLoanMoney);

module.exports = { loanMoneyRouter };
