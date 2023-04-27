// Models
const { EndowmentDelivery } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createEndowmentDelivery = catchAsync(async (req, res, next) => {
  const { date, pants, shirt, shod, employeeId } = req.body;

  const newEndowmentDelivery = await EndowmentDelivery.create({
    date,
    pants,
    shirt,
    shod,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newEndowmentDelivery,
  });
});

const getAllEndowmentDelivery = catchAsync(async (req, res, next) => {
  const endowmentDelivery = await EndowmentDelivery.findAll();
  res.status(201).json({
    status: "success",
    endowmentDelivery,
  });
});

const updateEndowmentDelivery = catchAsync(async (req, res, next) => {
  const { endowmentDelivery } = req;
  const { date, pants, shirt, shod } = req.body;
  await endowmentDelivery.update({
    date,
    pants,
    shirt,
    shod,
  });
  res.status(201).json({ status: "success", endowmentDelivery });
});

const deleteEndowmentDelivery = catchAsync(async (req, res, next) => {
  const { endowmentDelivery } = req;
  await endowmentDelivery.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createEndowmentDelivery,
  getAllEndowmentDelivery,
  updateEndowmentDelivery,
  deleteEndowmentDelivery,
};
