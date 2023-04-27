// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const validateDate = catchAsync(async (req, res, next) => {
  const { initialDate, finalDate } = req.body;

  if (new Date(initialDate).getTime() > new Date(finalDate).getTime()) {
    return next(new AppError("Fecha invalida", 404));
  }

  next();
});

module.exports = { validateDate };
