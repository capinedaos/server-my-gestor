// Models
const { Unfitness } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const unfitnessExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const unfitness = await Unfitness.findOne({ where: { id } });

  if (!unfitness) {
    return next(new AppError("Incapacidad no encontrada", 404));
  }

  req.unfitness = unfitness;
  next();
});

module.exports = { unfitnessExists };
