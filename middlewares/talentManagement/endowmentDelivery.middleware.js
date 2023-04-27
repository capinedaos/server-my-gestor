// Models
const { EndowmentDelivery } = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const endowmentDeliveryExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const endowmentDelivery = await EndowmentDelivery.findOne({ where: { id } });

  if (!endowmentDelivery) {
    return next(new AppError("Entrega de dotación no encontrada", 404));
  }

  req.endowmentDelivery = endowmentDelivery;
  next();
});

module.exports = { endowmentDeliveryExists };
