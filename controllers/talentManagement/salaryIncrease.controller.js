// Models
const { SalaryIncrease, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createsalaryIncrease = catchAsync(async (req, res, next) => {
  const { salary, dateIncrease, cause, personAuthorizes, employeeId } =
    req.body;

  const newSalaryIncrease = await SalaryIncrease.create({
    salary,
    dateIncrease,
    cause,
    personAuthorizes,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newSalaryIncrease,
  });
});

const getAllSalaryIncrease = catchAsync(async (req, res, next) => {
  const salaryIncrease = await SalaryIncrease.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    salaryIncrease,
  });
});

const updateSalaryIncrease = catchAsync(async (req, res, next) => {
  const { salaryIncrease } = req;
  const { salary, dateIncrease, cause, personAuthorizes } = req.body;

  await salaryIncrease.update({
    salary,
    dateIncrease,
    cause,
    personAuthorizes,
  });

  res.status(201).json({ status: "success", salaryIncrease });
});

const getSalaryIncreaseByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const salaryIncrease = await SalaryIncrease.findAll({
    where: { employeeId },
  });

  res.status(201).json({ status: "success", salaryIncrease });
});

const deleteSalaryIncrease = catchAsync(async (req, res, next) => {
  const { salaryIncrease } = req;
  await salaryIncrease.destroy();
  res.status(201).json({ status: "success", salaryIncrease });
});

module.exports = {
  createsalaryIncrease,
  getAllSalaryIncrease,
  updateSalaryIncrease,
  deleteSalaryIncrease,
  getSalaryIncreaseByEmployeeId,
};
