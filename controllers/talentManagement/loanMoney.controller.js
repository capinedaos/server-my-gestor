// Models
const { LoanMoney, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createLoanMoney = catchAsync(async (req, res, next) => {
  const {
    quantity,
    numberAmount,
    outlayDate,
    personAuthorizes,
    paymentMethod,
    cause,
    employeeId,
  } = req.body;

  const newLoanMoney = await LoanMoney.create({
    quantity,
    numberAmount,
    installmentValue: Math.floor(quantity / numberAmount),
    balance: quantity,
    outlayDate,
    personAuthorizes,
    paymentMethod,
    cause,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newLoanMoney,
  });
});

const getAllLoanMoney = catchAsync(async (req, res, next) => {
  const loanMoney = await LoanMoney.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    loanMoney,
  });
});

const getLoanMoneyById = catchAsync(async (req, res, next) => {
  const { loanMoney } = req;
  res.status(201).json({
    status: "success",
    loanMoneyById: loanMoney,
  });
});

const updateLoanMoney = catchAsync(async (req, res, next) => {
  const { loanMoney } = req;
  const {
    quantity,
    numberAmount,
    outlayDate,
    personAuthorizes,
    paymentMethod,
    cause,
  } = req.body;
  await loanMoney.update({
    quantity,
    numberAmount,
    installmentValue: Math.floor(quantity / numberAmount),
    balance: quantity,
    outlayDate,
    personAuthorizes,
    paymentMethod,
    cause,
  });
  res.status(201).json({ status: "success", loanMoney });
});

const deleteLoanMoney = catchAsync(async (req, res, next) => {
  const { loanMoney } = req;
  await loanMoney.destroy();
  res.status(201).json({ status: "success" });
});

const payLoan = catchAsync(async (req, res, next) => {
  const { loanMoney, sessionUser } = req;

  console.log(sessionUser);

  await loanMoney.update({
    status: "pagado ",
    balance: 0,
    paymentDate: new Date(),
  });

  res.status(201).json({ status: "success", loanMoney });
});

module.exports = {
  createLoanMoney,
  getAllLoanMoney,
  getLoanMoneyById,
  updateLoanMoney,
  deleteLoanMoney,
  payLoan,
};
