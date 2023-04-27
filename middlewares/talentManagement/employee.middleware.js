// Models
const { Employee } = require("../../models/talentManagement");

// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const employeeExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { employeeId } = req.body;

  const employee = await Employee.findOne({
    where: { id: id || employeeId, status: "activo" },
  });

  if (!employee) {
    return next(new AppError("Empleado no encontrado", 404));
  }

  req.employee = employee;
  next();
});

module.exports = { employeeExists };
