// Models
const {
  Employee,
  SocialSecurity,
  Endowment,
  FamilyInformation,
  HealthyLife,
  Contract,
  SalaryIncrease,
} = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createEmployee = catchAsync(async (req, res, next) => {
  const {
    names,
    identification,
    birthday,
    phone,
    area,
    salary,
    initialDate,
    finalDate,
  } = req.body;

  const newEmployee = await Employee.create({
    names: names.toLowerCase(),
    identification,
    // bankAccount,
    // gender: gender.toLowerCase(),
    birthday,
    // bloodTypes: bloodTypes.toLowerCase(),
    // rh: rh.toLowerCase(),
    phone,
    // city: city.toLowerCase(),
    // address: address.toLowerCase(),
    // email: email.toLowerCase(),
    // studies: studies.toLowerCase(),
    area,
  });

  const difference = Math.abs(new Date(finalDate) - new Date(initialDate));
  const days = difference / (1000 * 3600 * 24);

  if (newEmployee) {
    await SocialSecurity.create({
      employeeId: newEmployee.id,
    });
    await Endowment.create({
      employeeId: newEmployee.id,
    });
    await FamilyInformation.create({
      employeeId: newEmployee.id,
    });
    await HealthyLife.create({
      employeeId: newEmployee.id,
    });

    await Contract.create({
      typeContract: "por definir",
      salary,
      position: "por definir",
      initialDate,
      finalDate,
      duration: days,
      employeeId: newEmployee.id,
    });

    await SalaryIncrease.create({
      salary,
      dateIncrease: initialDate,
      cause: "Inicio de contrato",
      personAuthorizes: "Contrato inicial",
      employeeId: newEmployee.id,
    });
  }

  res.status(201).json({
    status: "success",
    newEmployee,
  });
});

const getAllEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findAll({
    where: { status: "activo" },
  });
  res.status(201).json({
    status: "success",
    employee,
  });
});

const getEmployeeById = catchAsync(async (req, res, next) => {
  const { employee } = req;
  res.status(201).json({
    status: "success",
    employeeById: employee,
  });
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const { employee } = req;
  const {
    names,
    identification,
    bankAccount,
    gender,
    birthday,
    bloodTypes,
    rh,
    phone,
    city,
    address,
    email,
    studies,
    area,
  } = req.body;
  console.log(bankAccount);
  await employee.update({
    names,
    identification,
    bankAccount,
    gender,
    birthday,
    bloodTypes,
    rh,
    phone,
    city,
    address,
    email,
    studies,
    area,
  });
  res.status(201).json({ status: "success", employee });
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const { employee } = req;
  await employee.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
