// Models
const { Contract, Extension } = require("../../models/talentManagement");

// Utils
const { AppError } = require("../../utils/appError.util");
const { catchAsync } = require("../../utils/catchAsync.util");

const contractExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { employeeId, contractId } = req.body;

  const contract = await Contract.findOne({
    where: { id: id || employeeId || contractId, status: "activo" },
    include: [
      {
        model: Extension,
        require: false,
      },
    ],
  });

  if (!contract) {
    return next(new AppError("Contrato no encontrado", 404));
  }

  req.contract = contract;
  next();
});

module.exports = { contractExists };
