// Models
const {
  BonusService,
  SalaryIncrease,
  MissingWork,
  Employee,
} = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createbonusService = catchAsync(async (req, res, next) => {
  const { initialDate, finalDate, transportationAssistance, employeeId } =
    req.body;

  const newInitialDate = new Date(initialDate);
  const newFinalDate = new Date(finalDate);

  const difference = Math.abs(newFinalDate - newInitialDate);
  const days = difference / (1000 * 3600 * 24) + 1;

  if (newInitialDate.getTime() > newFinalDate.getTime()) {
    return next(new AppError("Fecha invalida", 404));
  }

  // search days of absences
  let absenceDifference = 0;
  let daysMissingWork = 0;
  let absenceAccumulator = 0;
  let suspensionAccumulator = 0;
  let licenseAccumulator = 0;

  const missingWork = await MissingWork.findAll({
    where: { employeeId },
  });

  if (missingWork) {
    missingWork.map((missingWork) => {
      // initial offset
      if (
        new Date(missingWork.initialDate).getTime() <
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() < newFinalDate.getTime() &&
        new Date(missingWork.finalDate).getTime() >= newInitialDate.getTime()
      ) {
        absenceDifference = Math.abs(
          new Date(missingWork.finalDate) - newInitialDate
        );

        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;

        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // final offset
      if (
        new Date(missingWork.initialDate).getTime() >
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() > newFinalDate.getTime() &&
        new Date(missingWork.initialDate).getTime() <= newFinalDate.getTime()
      ) {
        absenceDifference = Math.abs(
          newFinalDate - new Date(missingWork.initialDate)
        );
        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // start and end offset
      if (
        new Date(missingWork.initialDate).getTime() <=
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() >= newFinalDate.getTime()
      ) {
        daysMissingWork = 15;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // without lag
      if (
        new Date(missingWork.initialDate).getTime() >=
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() <= newFinalDate.getTime()
      ) {
        absenceDifference = Math.abs(
          new Date(missingWork.finalDate) - new Date(missingWork.initialDate)
        );

        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
    });
  }

  const salaryIncrease = await SalaryIncrease.findAll({
    where: { employeeId },
  });

  let arraySalaryDay = [];
  let arrayDates = [];
  let salary = 0;

  salaryIncrease.sort((a, b) => {
    if (new Date(a.dateIncrease) < new Date(b.dateIncrease)) {
      return -1;
    }
  });

  salaryIncrease.map((increments) => {
    if (
      Math.abs(new Date(increments.dateIncrease) >= newInitialDate) &&
      Math.abs(new Date(increments.dateIncrease) <= newFinalDate)
    ) {
      let salaryDay = increments.salary / 30;
      arraySalaryDay.push(salaryDay);
      arrayDates.push(increments.dateIncrease);
    }
    if (arrayDates.length === 1) {
      salary = increments.salary;
    }
  });

  console.log(salary);

  if (arrayDates.length > 1) {
    let total = 0;
    let accumulatorTotalSalaries = 0;
    let acumulatorDays = 0;
    let difference = 0;
    let days = 0;
    for (let i = arrayDates.length - 1; i >= 0; i--) {
      difference = Math.abs(
        new Date(arrayDates[i + 1]) - new Date(arrayDates[i])
      );

      if (arrayDates[i + 1] == undefined) {
        difference = Math.abs(newFinalDate - new Date(arrayDates[i]));
      }

      days = difference / (1000 * 3600 * 24);
      total = days * arraySalaryDay[i];
      accumulatorTotalSalaries += total;
      acumulatorDays += days;
    }
    salary = Math.floor((accumulatorTotalSalaries / acumulatorDays) * 30);
  }

  const daysNotWorked =
    licenseAccumulator + absenceAccumulator + suspensionAccumulator;

  const baseTime = days - daysNotWorked;
  const netPayable = ((salary + transportationAssistance) / 360) * baseTime;

  const newBonusService = await BonusService.create({
    initialDate,
    finalDate,
    days,
    daysNotWorked,
    baseTime,
    averageSalary: Math.floor(salary),
    transportationAssistance: Math.floor(transportationAssistance),
    netPayable: Math.floor(netPayable),
    employeeId,
  });

  res.status(201).json({
    status: "success",
    newBonusService,
  });
});

const getAllBonusService = catchAsync(async (req, res, next) => {
  const bonusService = await BonusService.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    bonusService,
  });
});

const updateBonusService = catchAsync(async (req, res, next) => {
  const { bonusService } = req;
  const { initialDate, finalDate, transportationAssistance, employeeId } =
    req.body;

  const newInitialDate = new Date(initialDate);
  const newFinalDate = new Date(finalDate);

  const difference = Math.abs(newFinalDate - newInitialDate);
  const days = difference / (1000 * 3600 * 24) + 1;

  if (newInitialDate.getTime() > newFinalDate.getTime()) {
    return next(new AppError("Fecha invalida", 404));
  }

  // search days of absences
  let absenceDifference = 0;
  let daysMissingWork = 0;
  let absenceAccumulator = 0;
  let suspensionAccumulator = 0;
  let licenseAccumulator = 0;

  const missingWork = await MissingWork.findAll({
    where: { status: "activo", employeeId },
  });

  if (missingWork) {
    missingWork.map((missingWork) => {
      // initial offset
      if (
        new Date(missingWork.initialDate).getTime() <
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() < newFinalDate.getTime() &&
        new Date(missingWork.finalDate).getTime() >= newInitialDate.getTime()
      ) {
        absenceDifference = Math.abs(
          new Date(missingWork.finalDate) - newInitialDate
        );

        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;

        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // final offset
      if (
        new Date(missingWork.initialDate).getTime() >
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() > newFinalDate.getTime() &&
        new Date(missingWork.initialDate).getTime() <= newFinalDate.getTime()
      ) {
        absenceDifference = Math.abs(
          newFinalDate - new Date(missingWork.initialDate)
        );
        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // start and end offset
      if (
        new Date(missingWork.initialDate).getTime() <=
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() >= newFinalDate.getTime()
      ) {
        daysMissingWork = 15;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
      // without lag
      if (
        new Date(missingWork.initialDate).getTime() >=
          newInitialDate.getTime() &&
        new Date(missingWork.finalDate).getTime() <= newFinalDate.getTime()
      ) {
        absenceDifference = Math.abs(
          new Date(missingWork.finalDate) - new Date(missingWork.initialDate)
        );

        daysMissingWork = absenceDifference / (1000 * 3600 * 24) + 1;
        if (missingWork.cause === "licencia") {
          licenseAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "ausencia") {
          absenceAccumulator += daysMissingWork;
        }
        if (missingWork.cause === "suspension") {
          suspensionAccumulator += daysMissingWork;
        }
      }
    });
  }

  const salaryIncrease = await SalaryIncrease.findAll();

  let arraySalaryDay = [];
  let arrayDates = [];
  let salary = 0;

  salaryIncrease.sort((a, b) => {
    if (new Date(a.dateIncrease) < new Date(b.dateIncrease)) {
      return -1;
    }
  });

  salaryIncrease.map((increments) => {
    if (
      Math.abs(new Date(increments.dateIncrease) >= initialDate) &&
      Math.abs(new Date(increments.dateIncrease) <= finalDate)
    ) {
      let salaryDay = increments.salary / 30;
      arraySalaryDay.push(salaryDay);
      arrayDates.push(increments.dateIncrease);
    }
    if (arrayDates.length === 1) {
      salary = increments.salary;
    }
  });

  if (arrayDates.length > 1) {
    let total = 0;
    let accumulatorTotalSalaries = 0;
    let acumulatorDays = 0;
    let difference = 0;
    let days = 0;
    for (let i = arrayDates.length - 1; i >= 0; i--) {
      difference = Math.abs(
        new Date(arrayDates[i + 1]) - new Date(arrayDates[i])
      );

      if (arrayDates[i + 1] == undefined) {
        difference = Math.abs(newFinalDate - new Date(arrayDates[i]));
      }

      days = difference / (1000 * 3600 * 24);
      total = days * arraySalaryDay[i];
      accumulatorTotalSalaries += total;
      acumulatorDays += days;
    }
    salary = Math.floor((accumulatorTotalSalaries / acumulatorDays) * 30);
  }

  const daysNotWorked =
    licenseAccumulator + absenceAccumulator + suspensionAccumulator;

  const baseTime = days - daysNotWorked;

  const netPayable = salary + (transportationAssistance / 360) * baseTime;

  await bonusService.update({
    initialDate,
    finalDate,
    days,
    daysNotWorked,
    baseTime,
    averageSalary: Math.floor(salary),
    transportationAssistance: Math.floor(transportationAssistance),
    netPayable: Math.floor(netPayable),
  });

  res.status(201).json({ status: "success", bonusService });
});

const deleteBonusService = catchAsync(async (req, res, next) => {
  const { bonusService } = req;
  await bonusService.destroy();
  res.status(201).json({ status: "success" });
});

const getBonusServiceById = catchAsync(async (req, res, next) => {
  const { bonusService } = req;
  res.status(201).json({ status: "success", bonusService });
});

module.exports = {
  createbonusService,
  getAllBonusService,
  updateBonusService,
  deleteBonusService,
  getBonusServiceById,
};
