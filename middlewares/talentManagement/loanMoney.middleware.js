// Models
const { LoanMoney } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const loanMoneyExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const loanMoney = await LoanMoney.findOne({ where: { id } });

  if (!loanMoney) {
    return next(new AppError("Prestamo no encontrado", 404));
  }

  req.loanMoney = loanMoney;
  next();
});

module.exports = { loanMoneyExists };
