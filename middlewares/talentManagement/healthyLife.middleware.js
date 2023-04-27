// Models
const { HealthyLife, Employee } = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const healthyLifeExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const healthyLife = await HealthyLife.findOne({
    where: { id },
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });

  req.healthyLife = healthyLife;
  next();
});

module.exports = { healthyLifeExists };
