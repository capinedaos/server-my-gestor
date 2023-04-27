// Models
const { MissingWork } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const missingWorkExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const missingWork = await MissingWork.findOne({ where: { id } });

  if (!missingWork) {
    return next(new AppError("Ausencia no encontrada", 404));
  }

  req.missingWork = missingWork;
  next();
});

module.exports = { missingWorkExists };
