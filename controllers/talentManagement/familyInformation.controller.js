// Models
const { FamilyInformation } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");
const { AppError } = require("../../utils/appError.util");

const createFamilyInformation = catchAsync(async (req, res, next) => {
  const {
    maritalStatus,
    dependents,
    numberOfChildren,
    ageOfChildren,
    emergencyNumber,
    typeOfHousing,
    socialStratum,
    employeeId,
  } = req.body;

  const newFamilyInformation = await FamilyInformation.create({
    maritalStatus,
    dependents,
    numberOfChildren,
    ageOfChildren,
    emergencyNumber,
    typeOfHousing,
    socialStratum,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newFamilyInformation,
  });
});

const getAllFamilyInformation = catchAsync(async (req, res, next) => {
  const familyInformation = await FamilyInformation.findAll();
  res.status(201).json({
    status: "success",
    familyInformation,
  });
});

const getFamilyInformationByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;
  const id = parseInt(employeeId);

  const familyInformationByEmployee = await FamilyInformation.findOne({
    where: { employeeId: id },
  });

  res.status(201).json({
    status: "success",
    familyInformationByEmployee,
  });
});

const updateFamilyInformation = catchAsync(async (req, res, next) => {
  const { familyInformation } = req;
  const {
    maritalStatus,
    dependents,
    numberOfChildren,
    ageOfChildren,
    emergencyNumber,
    typeOfHousing,
    socialStratum,
  } = req.body;
  await familyInformation.update({
    maritalStatus,
    dependents,
    numberOfChildren,
    ageOfChildren,
    emergencyNumber,
    typeOfHousing,
    socialStratum,
  });
  res.status(201).json({ status: "success", familyInformation });
});

const getFamilyInformationById = catchAsync(async (req, res, next) => {
  const { familyInformation } = req;
  res.status(201).json({ status: "success", familyInformation });
});

const deleteFamilyInformation = catchAsync(async (req, res, next) => {
  const { familyInformation } = req;
  await familyInformation.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createFamilyInformation,
  getAllFamilyInformation,
  getFamilyInformationByEmployeeId,
  updateFamilyInformation,
  deleteFamilyInformation,
  getFamilyInformationById,
};
