// Models
const { BonusService } = require("../../models/talentManagement");

// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const bonusServiceExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const bonusService = await BonusService.findOne({ where: { id } });

  if (!bonusService) {
    return next(new AppError("Prima de servicios no encontrada", 404));
  }

  req.bonusService = bonusService;
  next();
});

module.exports = { bonusServiceExists };
