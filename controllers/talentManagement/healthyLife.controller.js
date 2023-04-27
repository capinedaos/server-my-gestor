// Models
const { HealthyLife, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createHealthyLife = catchAsync(async (req, res, next) => {
  const {
    hobby,
    alcoholConsumption,
    tobaccoUse,
    sports,
    conveyance,
    allergyMedicine,
    diseases,
    operations,
    medicines,
    employeeId,
  } = req.body;

  const newHealthyLife = await HealthyLife.create({
    hobby,
    alcoholConsumption,
    tobaccoUse,
    sports,
    conveyance,
    allergyMedicine,
    diseases,
    operations,
    medicines,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newHealthyLife,
  });
});

const getAllHealthyLife = catchAsync(async (req, res, next) => {
  const healthyLife = await HealthyLife.findAll();
  res.status(201).json({
    status: "success",
    healthyLife,
  });
});

const getHealthyLifeByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const healthyLifeByEmployee = await HealthyLife.findOne({
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
    healthyLifeByEmployee,
  });
});

const updateHealthyLife = catchAsync(async (req, res, next) => {
  const { healthyLife } = req;
  const {
    hobby,
    alcoholConsumption,
    tobaccoUse,
    sports,
    conveyance,
    allergyMedicine,
    diseases,
    operations,
    medicines,
  } = req.body;
  await healthyLife.update({
    hobby,
    alcoholConsumption,
    tobaccoUse,
    sports,
    conveyance,
    allergyMedicine,
    diseases,
    operations,
    medicines,
  });
  res.status(201).json({ status: "success", healthyLife });
});

const deleteHealthyLife = catchAsync(async (req, res, next) => {
  const { healthyLife } = req;
  await healthyLife.destroy();
  res.status(201).json({ status: "success" });
});

const getHealthyLifeById = catchAsync(async (req, res, next) => {
  const { healthyLife } = req;
  res.status(201).json({ status: "success", healthyLife });
});

module.exports = {
  createHealthyLife,
  getAllHealthyLife,
  getHealthyLifeByEmployeeId,
  updateHealthyLife,
  deleteHealthyLife,
  getHealthyLifeById,
};
