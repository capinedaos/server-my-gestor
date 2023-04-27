// Models
const { SalaryIncrease } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const salaryIncreaseExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const salaryIncrease = await SalaryIncrease.findOne({ where: { id } });

  if (!salaryIncrease) {
    return next(new AppError("Incremento de salario no encontrado", 404));
  }

  req.salaryIncrease = salaryIncrease;
  next();
});

module.exports = { salaryIncreaseExists };
