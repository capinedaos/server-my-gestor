// Models
const { Liquidation } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const liquidationExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const liquidation = await Liquidation.findOne({ where: { id } });

  if (!liquidation) {
    return next(new AppError("Liquidacion no encontrada", 404));
  }

  req.liquidation = liquidation;
  next();
});

module.exports = { liquidationExists };
