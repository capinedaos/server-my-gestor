// Models
const { SocialSecurity, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const socialSecurityExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const socialSecurity = await SocialSecurity.findOne({
    where: { id },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  req.socialSecurity = socialSecurity;
  next();
});

module.exports = { socialSecurityExists };
