// Models
const { Endowment, Employee } = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createEndowment = catchAsync(async (req, res, next) => {
  const { pants, shirt, shod, employeeId } = req.body;

  const newEndowment = await Endowment.create({
    pants,
    shirt,
    shod,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newEndowment,
  });
});

const getAllEndowment = catchAsync(async (req, res, next) => {
  const endowment = await Endowment.findAll();
  res.status(201).json({
    status: "success",
    endowment,
  });
});

const getEndowmentByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const endowmentByEmployee = await Endowment.findOne({
    where: { employeeId },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  res.status(201).json({
    status: "success",
    endowmentByEmployee,
  });
});

const updateEndowment = catchAsync(async (req, res, next) => {
  const { endowment } = req;
  const { pants, shirt, shod } = req.body;
  await endowment.update({
    pants,
    shirt,
    shod,
  });
  res.status(201).json({ status: "success", endowment });
});

const getEndowmentById = catchAsync(async (req, res, next) => {
  const { endowment } = req;
  res.status(201).json({ status: "success", endowment });
});

const deleteEndowment = catchAsync(async (req, res, next) => {
  const { endowment } = req;
  await endowment.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createEndowment,
  getAllEndowment,
  getEndowmentByEmployeeId,
  updateEndowment,
  deleteEndowment,
  getEndowmentById,
};
