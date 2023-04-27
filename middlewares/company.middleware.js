// Models
const { Company } = require("../models/company.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const companyExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { companyId } = req.body;

  const company = await Company.findOne({ where: { id: id || companyId } });

  if (!company) {
    return next(new AppError("Compañia no encontrada", 404));
  }

  req.company = company;
  next();
});

module.exports = { companyExists };
