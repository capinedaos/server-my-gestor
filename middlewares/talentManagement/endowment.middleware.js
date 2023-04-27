// Models
const { Endowment, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const endowmentExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const endowment = await Endowment.findOne({
    where: { id },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  req.endowment = endowment;
  next();
});

module.exports = { endowmentExists };
