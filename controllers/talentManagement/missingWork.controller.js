// Models
const { MissingWork, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createMissingWork = catchAsync(async (req, res, next) => {
  const { cause, observation, initialDate, finalDate, paidOut, employeeId } =
    req.body;

  let state = false;

  if (cause !== "licencia" || paidOut === "true") {
    state = true;
  }

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24) + 1;

  const newMissingWork = await MissingWork.create({
    cause,
    observation,
    initialDate,
    finalDate,
    term: days,
    paidOut: state,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newMissingWork,
  });
});

const getAllMissingWork = catchAsync(async (req, res, next) => {
  const missingWork = await MissingWork.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    missingWork,
  });
});

const getMissingWorkById = catchAsync(async (req, res, next) => {
  const { missingWork } = req;
  res.status(201).json({
    status: "success",
    missingWork,
  });
});

const updateMissingWork = catchAsync(async (req, res, next) => {
  const { missingWork } = req;
  const { cause, observation, initialDate, finalDate, paidOut, employeeId } =
    req.body;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24) + 1;

  await missingWork.update({
    cause,
    observation,
    initialDate,
    finalDate,
    term: days,
    paidOut,
    employeeId,
  });
  res.status(201).json({ status: "success", missingWork });
});

const deleteMissingWork = catchAsync(async (req, res, next) => {
  const { missingWork } = req;
  await missingWork.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createMissingWork,
  getAllMissingWork,
  getMissingWorkById,
  updateMissingWork,
  deleteMissingWork,
};
