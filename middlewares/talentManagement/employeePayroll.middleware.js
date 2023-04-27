// Models
const {
  EmployeePayroll,
  Employee,
  OverallPayroll,
} = require("../../models/talentManagement");
// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const employeePayrollExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const employeePayroll = await EmployeePayroll.findOne({
    where: { id },
    include: [
      {
        model: Employee,
        required: false,
      },
      {
        model: OverallPayroll,
        required: false,
      },
    ],
  });

  if (!employeePayroll) {
    return next(new AppError("Nomina empleado no encontrada", 404));
  }

  req.employeePayroll = employeePayroll;
  next();
});

module.exports = { employeePayrollExists };
