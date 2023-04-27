// Models
const { PayInMoney } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const payInMoneyExists = catchAsync(async (req, res, next) => {
  const { loanMoneyId } = req.params;

  const payInMoney = await PayInMoney.findAll({
    where: { loanMoneyId },
  });

  if (!payInMoney) {
    return next(new AppError("Abono a prestamo no encontrado", 404));
  }

  req.payInMoney = payInMoney;
  next();
});

module.exports = { payInMoneyExists };
