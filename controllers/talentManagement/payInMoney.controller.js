// Models
const { PayInMoney } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createPayInMoney = catchAsync(async (req, res, next) => {
  const { quantity, loanMoneyId } = req.body;

  const newPayInMoney = await PayInMoney.create({
    quantity: Math.floor(quantity),
    deductionDate: new Date(),
    loanMoneyId,
  });
  res.status(201).json({
    status: "success",
    newPayInMoney,
  });
});

const getPayInMoneyByLoanMoneyId = catchAsync(async (req, res, next) => {
  const { payInMoney } = req;
  res.status(201).json({
    status: "success",
    payInMoney,
  });
});

const deletePayInMoneyByLoanMoneyId = catchAsync(async (req, res, next) => {
  const { payInMoney } = req;
  await payInMoney.destroy();
  res.status(201).json({ status: "success", payInMoney });
});

module.exports = {
  getPayInMoneyByLoanMoneyId,
  deletePayInMoneyByLoanMoneyId,
  createPayInMoney,
};
