// Models
const { Extension } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");
const { AppError } = require("../../utils/appError.util");

const createExtension = catchAsync(async (req, res, next) => {
  const { initialDate, finalDate, contractId } = req.body;
  const { contract } = req;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24);

  let numberExtension = 1;

  for (let i = 0; i < contract.extensions.length; i++) {
    numberExtension += 1;
    if (numberExtension > 3) {
      return next(new AppError("El empleado ya tiene tres renovaciones", 404));
    }
  }

  const newExtension = await Extension.create({
    duration: days,
    initialDate,
    finalDate,
    numberExtension,
    contractId,
  });

  res.status(201).json({
    status: "success",
    newExtension,
  });
});

const getAllExtension = catchAsync(async (req, res, next) => {
  const extension = await Extension.findAll();
  res.status(201).json({
    status: "success",
    extension,
  });
});

const getExtensionById = catchAsync(async (req, res, next) => {
  const { extension } = req;
  res.status(201).json({
    status: "success",
    extension,
  });
});

const updateExtension = catchAsync(async (req, res, next) => {
  const { extension } = req;
  const { duration, initialDate, finalDate, numberExtension, contractId } =
    req.body;
  await extension.update({
    duration,
    initialDate,
    finalDate,
    numberExtension,
    contractId,
  });
  res.status(201).json({ status: "success", extension });
});

const deleteExtension = catchAsync(async (req, res, next) => {
  const { extension } = req;
  await extension.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createExtension,
  getAllExtension,
  getExtensionById,
  updateExtension,
  deleteExtension,
};
