// Models
const { Extension } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const extensionExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const extension = await Extension.findOne({ where: { id } });

  if (!extension) {
    return next(new AppError("Prorroga no encontrada", 404));
  }

  req.extension = extension;
  next();
});

module.exports = { extensionExists };
