const express = require("express");

// Controllers
const {
  getPayInMoneyByLoanMoneyId,
  deletePayInMoneyByLoanMoneyId,
  createPayInMoney,
} = require("../../controllers/talentManagement/payInMoney.controller");

// Middlewares
const { payInMoneyExists } = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const payInMoneyRouter = express.Router();

payInMoneyRouter.use(protectSession);

payInMoneyRouter.post("/", createPayInMoney);

payInMoneyRouter.use(userAdmin);

payInMoneyRouter.get(
  "/:loanMoneyId",
  payInMoneyExists,
  getPayInMoneyByLoanMoneyId
);

payInMoneyRouter.delete("/:loanMoneyId", deletePayInMoneyByLoanMoneyId);

module.exports = { payInMoneyRouter };
