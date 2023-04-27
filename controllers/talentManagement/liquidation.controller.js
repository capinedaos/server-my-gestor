// Models
const {
  Liquidation,
  MissingWork,
  SalaryIncrease,
  Employee,
  Contract,
} = require("../../models/talentManagement");
// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createLiquidation = catchAsync(async (req, res, next) => {
  const {
    finalDate,
    initialDateBonus,
    finalDateBonus,
    transportationAssistance,
    employeeId,
  } = req.body;

  const transportationAssistanceNumber = Number(transportationAssistance);

  const contract = await Contract.findOne({
    where: { employeeId, status: "activo" },
  });

  const newInitialDate = new Date(contract.initialDate);
  const newFinalDate = new Date(finalDate);
  const difference = Math.abs(newFinalDate - newInitialDate);
  const totalDays = difference / (1000 * 3600 * 24) + 1;

  const differencebonusDays = Math.abs(
    new Date(initialDateBonus) - new Date(finalDateBonus)
  );
  const bonusDays = differencebonusDays / (1000 * 3600 * 24) + 1;

  if (newInitialDate.getTime() > newFinalDate.getTime()) {
    return next(new AppError("Fecha de liquidacion invalida", 404));
  }

  if (
    new Date(initialDateBonus).getTime() > new Date(finalDateBonus).getTime()
  ) {
    return next(new AppError("Fecha de prima invalida", 404));
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

  const liquidationBasis = salary + transportationAssistanceNumber;

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

  const daysNotWorked =
    licenseAccumulator + absenceAccumulator + suspensionAccumulator;

  const baseTime = totalDays - daysNotWorked;

  const unemploymentAssistance = (liquidationBasis * baseTime) / 360;

  const unemploymentInterests =
    (unemploymentAssistance * 0.12 * baseTime) / 360;

  const holidays = (salary * baseTime) / 720;

  const totalBonusDays = bonusDays - daysNotWorked;

  const bonus = (liquidationBasis * totalBonusDays) / 360;

  const totalLiquidation =
    unemploymentAssistance + unemploymentInterests + holidays + bonus;

  // console.log("salary: " + salary);
  // console.log("transportationAssistance: " + transportationAssistance);
  // console.log("liquidationBasis: " + liquidationBasis);
  // console.log("initialDate: " + newInitialDate);
  // console.log("finalDate: " + finalDate);
  // console.log("initialDateBonus: " + initialDateBonus);
  // console.log("finalDateBonus: " + finalDateBonus);
  // console.log("totalDays: " + totalDays);
  // console.log("daysNotWorked: " + daysNotWorked);
  // console.log("baseTime: " + baseTime);
  // console.log("unemploymentAssistance: " + Math.floor(unemploymentAssistance));
  // console.log("unemploymentInterests: " + Math.floor(unemploymentInterests));
  // console.log("holidays: " + Math.floor(holidays));
  // console.log("totalBonusDays: " + totalBonusDays);
  // console.log("bonus: " + Math.floor(bonus));
  // console.log("totalLiquidation: " + Math.floor(totalLiquidation));
  // console.log("employeeId: " + employeeId);

  const newLiquidation = await Liquidation.create({
    salary,
    transportationAssistance: transportationAssistanceNumber,
    liquidationBasis,
    initialDate: newInitialDate,
    finalDate,
    initialDateBonus,
    finalDateBonus,
    totalDays,
    daysNotWorked,
    baseTime,
    unemploymentAssistance: Math.floor(unemploymentAssistance),
    unemploymentInterests: Math.floor(unemploymentInterests),
    holidays: Math.floor(holidays),
    totalBonusDays,
    bonus: Math.floor(bonus),
    totalLiquidation: Math.floor(totalLiquidation),
    employeeId,
  });

  // if (newLiquidation) {
  //   await contract.update({
  //     status: "terminado",
  //   });
  // }

  res.status(201).json({
    status: "success",
    newLiquidation,
  });
});

const getAllLiquidation = catchAsync(async (req, res, next) => {
  const liquidation = await Liquidation.findAll({
    include: [
      {
        model: Employee,
        required: false,
      },
    ],
  });
  res.status(201).json({
    status: "success",
    liquidation,
  });
});

const getLiquidationById = catchAsync(async (req, res, next) => {
  const { liquidation } = req;
  res.status(201).json({
    status: "success",
    liquidation,
  });
});

const updateLiquidation = catchAsync(async (req, res, next) => {
  const {
    finalDate,
    initialDateBonus,
    finalDateBonus,
    transportationAssistance,
    employeeId,
  } = req.body;

  const { liquidation } = req;
  const transportationAssistanceNumber = Number(transportationAssistance);

  const contract = await Contract.findOne({
    where: { employeeId, status: "activo" },
  });

  const newInitialDate = new Date(contract.initialDate);
  const newFinalDate = new Date(finalDate);
  const difference = Math.abs(newFinalDate - newInitialDate);
  const totalDays = difference / (1000 * 3600 * 24) + 1;

  const differencebonusDays = Math.abs(
    new Date(initialDateBonus) - new Date(finalDateBonus)
  );
  const bonusDays = differencebonusDays / (1000 * 3600 * 24) + 1;

  if (newInitialDate.getTime() > newFinalDate.getTime()) {
    return next(new AppError("Fecha de liquidacion invalida", 404));
  }

  if (
    new Date(initialDateBonus).getTime() > new Date(finalDateBonus).getTime()
  ) {
    return next(new AppError("Fecha de prima invalida", 404));
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
      Math.abs(new Date(increments.dateIncrease) >= newInitialDate) &&
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

  const liquidationBasis = salary + transportationAssistanceNumber;

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

  const daysNotWorked =
    licenseAccumulator + absenceAccumulator + suspensionAccumulator;

  const baseTime = totalDays - daysNotWorked;

  const unemploymentAssistance = (liquidationBasis * baseTime) / 360;

  const unemploymentInterests =
    (unemploymentAssistance * 0.12 * baseTime) / 360;

  const holidays = (salary * baseTime) / 720;

  const totalBonusDays = bonusDays - daysNotWorked;

  const bonus = (liquidationBasis * totalBonusDays) / 360;

  const totalLiquidation =
    unemploymentAssistance + unemploymentInterests + holidays + bonus;

  await liquidation.update({
    salary,
    transportationAssistance: transportationAssistanceNumber,
    liquidationBasis,
    initialDate: newInitialDate,
    finalDate,
    totalDays,
    daysNotWorked,
    baseTime,
    unemploymentAssistance: Math.floor(unemploymentAssistance),
    unemploymentInterests: Math.floor(unemploymentInterests),
    holidays: Math.floor(holidays),
    totalBonusDays,
    bonus: Math.floor(bonus),
    totalLiquidation: Math.floor(totalLiquidation),
  });

  res.status(201).json({
    status: "success",
    liquidation,
  });
});

const deleteLiquidation = catchAsync(async (req, res, next) => {
  const { liquidation } = req;
  await liquidation.destroy();
  res.status(201).json({ status: "success" });
});

module.exports = {
  createLiquidation,
  getAllLiquidation,
  getLiquidationById,
  updateLiquidation,
  deleteLiquidation,
};
