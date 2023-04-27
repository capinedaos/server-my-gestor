// Models
const {
  Contract,
  SalaryIncrease,
  Employee,
} = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createContract = catchAsync(async (req, res, next) => {
  const { salary, initialDate, finalDate, employeeId } = req.body;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24);

  const contract = await Contract.findOne({
    where: { employeeId, status: "activo" },
  });

  if (!contract) {
    const newContract = await Contract.create({
      typeContract: "por definir",
      salary,
      position: "por definir",
      initialDate,
      finalDate,
      duration: days,
      employeeId,
    });

    await SalaryIncrease.create({
      salary,
      dateIncrease: initialDate,
      cause: "Inicio de contrato",
      personAuthorizes: "Inicio de contrato",
      employeeId,
    });

    res.status(201).json({
      status: "success",
      newContract,
    });
  }
});

const getAllContract = catchAsync(async (req, res, next) => {
  const contract = await Contract.findAll({
    where: { status: "activo" },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    contract,
  });
});

const getAllContractByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const contract = await Contract.findAll({
    where: { employeeId },
  });

  res.status(201).json({
    status: "success",
    contractByEmployeeId: contract,
  });
});

const getContractById = catchAsync(async (req, res, next) => {
  const { contract } = req;
  res.status(201).json({
    status: "success",
    contract,
  });
});

const updateContract = catchAsync(async (req, res, next) => {
  const { contract } = req;
  const { typeContract, salary, position, initialDate, finalDate, employeeId } =
    req.body;

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24);

  await contract.update({
    typeContract,
    salary,
    position,
    initialDate,
    finalDate,
    duration: days,
    employeeId,
  });
  res.status(201).json({ status: "success", contract });
});

const deleteContract = catchAsync(async (req, res, next) => {
  const { contract } = req;
  await contract.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createContract,
  getAllContract,
  getAllContractByEmployeeId,
  getContractById,
  updateContract,
  deleteContract,
};
