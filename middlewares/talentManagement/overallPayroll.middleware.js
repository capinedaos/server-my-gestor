// Models
const { OverallPayroll } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const overallPayrollExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { overallPayrollId } = req.body;

  const overallPayroll = await OverallPayroll.findOne({
    where: { id: id || overallPayrollId },
  });

  if (!overallPayroll) {
    return next(new AppError("Nomina general no encontrada", 404));
  }

  req.overallPayroll = overallPayroll;
  next();
});

module.exports = { overallPayrollExists };
