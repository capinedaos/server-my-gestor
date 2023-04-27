// Models
const { Company } = require("../models/company.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createCompany = catchAsync(async (req, res, next) => {
  const { companyName, nit, address, city, phone, email } = req.body;

  const newCompany = await Company.create({
    companyName,
    nit,
    address,
    city,
    phone,
    email,
  });

  console.log(newCompany)

  res.status(201).json({
    status: "success",
    newCompany,
  });
});

const getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findOne({ where: { id: 1 } });

  res.status(201).json({
    status: "success",
    company,
  });
});

const updateCompany = catchAsync(async (req, res, next) => {
  const { company } = req;
  const { companyName, nit, address, city, phone, email } = req.body;
  await company.update({ companyName, nit, address, city, phone, email });
  res.status(201).json({ status: "success", company });
});

const deleteCompany = catchAsync(async (req, res, next) => {
  const { company } = req;
  await company.destroy();
  res.status(201).json({ status: "success", company });
});

module.exports = {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
};
