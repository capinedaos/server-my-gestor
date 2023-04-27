// Models
const { Unfitness, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createUnfitness = catchAsync(async (req, res, next) => {
  const { origin, diagnostic, initialDate, finalDate, employeeId } = req.body;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24) + 1;

  const newUnfitness = await Unfitness.create({
    origin,
    diagnostic,
    initialDate,
    finalDate,
    term: days,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newUnfitness,
  });
});

const getAllUnfitness = catchAsync(async (req, res, next) => {
  const unfitness = await Unfitness.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  res.status(201).json({
    status: "success",
    unfitness,
  });
});

const getUnfitnessById = catchAsync(async (req, res, next) => {
  const { unfitness } = req;
  res.status(201).json({
    status: "success",
    unfitness,
  });
});

const updateUnfitness = catchAsync(async (req, res, next) => {
  const { unfitness } = req;
  const { origin, diagnostic, initialDate, finalDate, employeeId } = req.body;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24) + 1;

  await unfitness.update({
    origin,
    diagnostic,
    initialDate,
    finalDate,
    term: days,
    employeeId,
  });

  res.status(201).json({ status: "success", unfitness });
});

const deleteUnfitness = catchAsync(async (req, res, next) => {
  const { unfitness } = req;
  await unfitness.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createUnfitness,
  getAllUnfitness,
  getUnfitnessById,
  updateUnfitness,
  deleteUnfitness,
};
