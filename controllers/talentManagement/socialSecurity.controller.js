// Models
const { SocialSecurity, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createSocialSecurity = catchAsync(async (req, res, next) => {
  const { arl, compensationBox, eps, afp, employeeId } = req.body;

  const newSocialSecurity = await SocialSecurity.create({
    arl,
    compensationBox,
    eps,
    afp,
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newSocialSecurity,
  });
});

const getAllSocialSecurity = catchAsync(async (req, res, next) => {
  const socialSecurity = await SocialSecurity.findAll();
  res.status(201).json({
    status: "success",
    socialSecurity,
  });
});

const getSocialSecurityEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const socialSecurityEmployee = await SocialSecurity.findOne({
    where: { employeeId },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  res.status(201).json({
    status: "success",
    socialSecurityEmployee,
  });
});

const updateSocialSecurity = catchAsync(async (req, res, next) => {
  const { socialSecurity } = req;
  const { arl, compensationBox, eps, afp } = req.body;
  await socialSecurity.update({
    arl,
    compensationBox,
    eps,
    afp,
  });
  res.status(201).json({ status: "success", socialSecurity });
});

const getSocialSecurityById = catchAsync(async (req, res, next) => {
  const { socialSecurity } = req;
  res.status(201).json({ status: "success", socialSecurity });
});

const deleteSocialSecurity = catchAsync(async (req, res, next) => {
  const { socialSecurity } = req;
  await socialSecurity.destroy();
  res.status(201).json({ status: "success", socialSecurity });
});

module.exports = {
  createSocialSecurity,
  getAllSocialSecurity,
  getSocialSecurityEmployeeId,
  updateSocialSecurity,
  deleteSocialSecurity,
  getSocialSecurityById,
};
