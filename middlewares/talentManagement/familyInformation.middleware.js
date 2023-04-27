// Models
const {
  FamilyInformation,
  Employee,
} = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const familyInformationExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const familyInformation = await FamilyInformation.findOne({
    where: { id },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  req.familyInformation = familyInformation;
  next();
});

module.exports = { familyInformationExists };
