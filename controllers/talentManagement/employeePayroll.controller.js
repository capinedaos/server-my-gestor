// Models
const {
  EmployeePayroll,
  Unfitness,
  LoanMoney,
  PayInMoney,
  MissingWork,
  OverallPayroll,
  SalaryIncrease,
  Employee,
} = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");

const createEmployeePayroll = catchAsync(async (req, res, next) => {
  const { employeeId, overallPayrollId } = req.body;

  const { overallPayroll } = req;

  const newInitialDate = new Date(overallPayroll.initialDate);
  const newFinalDate = new Date(overallPayroll.finalDate);

  const { employee } = req;
  let salary = 0;

  const salaryIncrease = await SalaryIncrease.findAll({
    where: { employeeId },
  });

  salaryIncrease.sort((a, b) => {
    if (new Date(a.dateIncrease) < new Date(b.dateIncrease)) {
      return -1;
    }
  });

  salaryIncrease.map((increments) => {
    salary = increments.salary;
  });

  const bankAccount = employee.bankAccount;
  const difference = Math.abs(newFinalDate - newInitialDate);
  const days = difference / (1000 * 3600 * 24) + 1;

  // Modelsdisability days search
  let disabilityDifference = 0;
  let daysUnfitnes = 0;
  let commonDisabilityAccumulator = 0;
  let workDisabilityAccumulator = 0;

  const unfitness = await Unfitness.findAll({
    where: { employeeId },
  });

  if (unfitness) {
    unfitness.map((unfitness) => {
      // initial offset
      if (
        new Date(unfitness.initialDate).getTime() < newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() < newFinalDate.getTime() &&
        new Date(unfitness.finalDate).getTime() >= newInitialDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          new Date(unfitness.finalDate) - newInitialDate
        );

        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;

        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // final offset
      if (
        new Date(unfitness.initialDate).getTime() > newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() > newFinalDate.getTime() &&
        new Date(unfitness.initialDate).getTime() <= newFinalDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          newFinalDate - new Date(unfitness.initialDate)
        );
        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // start and end offset
      if (
        new Date(unfitness.initialDate).getTime() <= newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() >= newFinalDate.getTime()
      ) {
        daysUnfitnes = 15;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // without lag
      if (
        new Date(unfitness.initialDate).getTime() >= newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() <= newFinalDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          new Date(unfitness.finalDate) - new Date(unfitness.initialDate)
        );

        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
    });
  }

  const daysUnfitnessGeneral = Math.floor(commonDisabilityAccumulator);
  const daysUnfitnessWorking = Math.floor(workDisabilityAccumulator);

  // search days of absences
  let absenceDifference = 0;
  let daysMissingWork = 0;
  let licenseAccumulator = 0;
  let absenceAccumulator = 0;
  let suspensionAccumulator = 0;

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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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

  // calculation of days worked
  const workedDays =
    days - daysUnfitnessGeneral - daysUnfitnessWorking - daysMissingWork;

  // disability value
  const disabilityValue =
    (((salary / 30) * 66.67) / 100) * daysUnfitnessGeneral;

  // console.log("initialDate: " + newInitialDate);
  // console.log("finalDate: " + newFinalDate);
  // console.log("salary: " + salary);
  // console.log("bankAccount: " + bankAccount);
  // console.log("payrollDays: " + days);
  // console.log("workedDays: " + workedDays);
  // console.log("daysUnfitnessGeneral: " + daysUnfitnessGeneral);
  // console.log("disabilityValue: " + disabilityValue);
  // console.log("daysUnfitnessWorking: " + daysUnfitnessWorking);
  // console.log("daysOfAbsence: " + absenceAccumulator);
  // console.log("daysOfLicence: " + licenseAccumulator);
  // console.log("daysOfSuspension: " + suspensionAccumulator);
  // console.log("employeeId: " + employeeId);
  // console.log("overallPayrollId: " + overallPayrollId);

  const newEmployeePayroll = await EmployeePayroll.create({
    initialDate: newInitialDate,
    finalDate: newFinalDate,
    salary,
    bankAccount,
    payrollDays: days,
    workedDays,
    daysUnfitnessGeneral,
    disabilityValue: Math.floor(disabilityValue),
    daysUnfitnessWorking,
    daysOfAbsence: absenceAccumulator,
    daysOfLicence: licenseAccumulator,
    daysOfSuspension: suspensionAccumulator,
    employeeId,
    overallPayrollId,
  });

  res.status(201).json({
    status: "success",
    newEmployeePayroll,
  });
});

const getAllEmployeePayroll = catchAsync(async (req, res, next) => {
  const employeePayroll = await EmployeePayroll.findAll({
    where: { status: "activo" },
  });
  res.status(201).json({
    status: "success",
    employeePayroll,
  });
});

const getEmployeePayrollById = catchAsync(async (req, res, next) => {
  const { employeePayroll } = req;
  res.status(201).json({
    status: "success",
    employeePayrollById: employeePayroll,
  });
});

const getEmployeePayrollByEmployeeId = catchAsync(async (req, res, next) => {
  const { employeeId } = req;

  const employeePayroll = await EmployeePayroll.findOne({
    where: { employeeId },
    include: [
      {
        model: Employee,
        required: false,
      },
      {
        model: OverallPayroll,
        required: false,
      },
    ],
  });

  res.status(201).json({
    status: "success",
    employeePayrollByEmployeeId: employeePayroll,
  });
});

const updateEmployeePayroll = catchAsync(async (req, res, next) => {
  const { employeePayroll } = req;
  const {
    hDiurnalBasic,
    hNocturnalBasic,
    hDiurnalExtra,
    hNocturnalExtra,
    hFestiveDiurnalBasic,
    hFestiveNocturnalBasic,
    hFestiveDiurnalExtra,
    hFestiveNocturnalExtra,
    hCompensated,
    otherDeductions,
    employeeId,
    overallPayrollId,
  } = req.body;

  const overallPayroll = await OverallPayroll.findOne({
    where: { id: overallPayrollId },
  });

  const newInitialDate = new Date(overallPayroll.initialDate);
  const newFinalDate = new Date(overallPayroll.finalDate);

  const employee = await Employee.findOne({
    where: { id: employeeId },
  });
  let salary = 0;

  const salaryIncrease = await SalaryIncrease.findAll({
    where: { employeeId },
  });

  salaryIncrease.sort((a, b) => {
    if (new Date(a.dateIncrease) < new Date(b.dateIncrease)) {
      return -1;
    }
  });

  salaryIncrease.map((increments) => {
    salary = increments.salary;
  });

  const bankAccount = employee.bankAccount;
  const difference = Math.abs(newFinalDate - newInitialDate);
  const days = difference / (1000 * 3600 * 24) + 1;

  // value of hourly rates
  const valueTimeBasicDiurnal = salary / 240;
  const valueTimeNocturnalBasic = valueTimeBasicDiurnal * 1.35;
  const valueTimeDiurnalExtra = valueTimeBasicDiurnal * 1.25;
  const valueTimeNocturnalExtra = valueTimeBasicDiurnal * 1.75;
  const valueTimeFestiveDiurnalBasic = valueTimeBasicDiurnal * 1.75;
  const valueTimeFestiveNocturnalBasic =
    valueTimeBasicDiurnal * 1.1 + valueTimeBasicDiurnal;
  const valueTimeFestiveDiurnalExtra = valueTimeBasicDiurnal * 2;
  const valueTimeFestiveNocturnalExtra =
    valueTimeBasicDiurnal * 1.5 + valueTimeBasicDiurnal;
  const valueTimeCompensatory =
    valueTimeFestiveDiurnalBasic - valueTimeBasicDiurnal;

  // total value hours
  const totalDiurnalBasic = hDiurnalBasic * valueTimeBasicDiurnal;
  const totalNocturnalBasic = hNocturnalBasic * valueTimeNocturnalBasic;
  const totalDiurnalExtra = hDiurnalExtra * valueTimeDiurnalExtra;
  const totalNocturnalExtra = hNocturnalExtra * valueTimeNocturnalExtra;
  const totalFestiveDiurnalBasic =
    hFestiveDiurnalBasic * valueTimeFestiveDiurnalBasic;
  const totalFestiveNocturnalBasic =
    hFestiveNocturnalBasic * valueTimeFestiveNocturnalBasic;
  const totalFestiveDiurnalExtra =
    hFestiveDiurnalExtra * valueTimeFestiveDiurnalExtra;
  const totalFestiveNocturnalExtra =
    hFestiveNocturnalExtra * valueTimeFestiveNocturnalExtra;
  const totalCompensatory = hCompensated * valueTimeCompensatory;

  // Modelsdisability days search
  let disabilityDifference = 0;
  let daysUnfitnes = 0;
  let commonDisabilityAccumulator = 0;
  let workDisabilityAccumulator = 0;

  const unfitness = await Unfitness.findAll({
    where: { employeeId },
  });

  if (unfitness) {
    unfitness.map((unfitness) => {
      // initial offset
      if (
        new Date(unfitness.initialDate).getTime() < newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() < newFinalDate.getTime() &&
        new Date(unfitness.finalDate).getTime() >= newInitialDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          new Date(unfitness.finalDate) - newInitialDate
        );

        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;

        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // final offset
      if (
        new Date(unfitness.initialDate).getTime() > newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() > newFinalDate.getTime() &&
        new Date(unfitness.initialDate).getTime() <= newFinalDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          newFinalDate - new Date(unfitness.initialDate)
        );
        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // start and end offset
      if (
        new Date(unfitness.initialDate).getTime() <= newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() >= newFinalDate.getTime()
      ) {
        daysUnfitnes = 15;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
      // without lag
      if (
        new Date(unfitness.initialDate).getTime() >= newInitialDate.getTime() &&
        new Date(unfitness.finalDate).getTime() <= newFinalDate.getTime()
      ) {
        disabilityDifference = Math.abs(
          new Date(unfitness.finalDate) - new Date(unfitness.initialDate)
        );

        daysUnfitnes = disabilityDifference / (1000 * 3600 * 24) + 1;
        if (unfitness.origin === "general") {
          commonDisabilityAccumulator += daysUnfitnes;
        }
        if (unfitness.origin === "laboral") {
          workDisabilityAccumulator += daysUnfitnes;
        }
      }
    });
  }

  const daysUnfitnessGeneral = Math.floor(commonDisabilityAccumulator);
  const daysUnfitnessWorking = Math.floor(workDisabilityAccumulator);

  // search days of absences

  let absenceDifference = 0;
  let daysMissingWork = 0;
  let licenseAccumulator = 0;
  let absenceAccumulator = 0;
  let suspensionAccumulator = 0;
  let recompensed = false;

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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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
          if (missingWork.paidOut === true) {
            recompensed = true;
          }
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

  // absence deduction
  let deductionAbsence = 0;

  if (absenceAccumulator > 0) {
    deductionAbsence =
      (salary / 30) * Math.floor(absenceAccumulator) + salary / 30;
  }

  let deductionLicense = 0;
  let deductionSuspension = 0;
  deductionSuspension = Math.floor(suspensionAccumulator) * (salary / 30);

  // license deduction
  if (recompensed === false) {
    deductionLicense = Math.floor(licenseAccumulator) * (salary / 30);
  }

  const valueDaytransportationAssistance = 117172 / 30;

  // calculation of days worked
  const workedDays =
    days - daysUnfitnessGeneral - daysUnfitnessWorking - daysMissingWork;

  // transportation aid calculation
  const transportationAssistance =
    valueDaytransportationAssistance * workedDays;

  // disability value
  const disabilityValue =
    (((salary / 30) * 66.67) / 100) * daysUnfitnessGeneral;

  const totalAccrued =
    totalDiurnalBasic +
    totalNocturnalBasic +
    totalDiurnalExtra +
    totalNocturnalExtra +
    totalFestiveDiurnalBasic +
    totalFestiveNocturnalBasic +
    totalFestiveDiurnalExtra +
    totalFestiveNocturnalExtra +
    totalCompensatory +
    disabilityValue +
    transportationAssistance;

  // deduction for health contribution
  const health = (4 * (salary / 2)) / 100;
  // deduction for pension contribution
  const pension = (4 * (salary / 2)) / 100;

  // active loan search
  const loanMoney = await LoanMoney.findOne({
    where: { status: "activo", employeeId },
  });

  let quantity = 0;

  if (loanMoney) {
    // creation of subscription to active loan
    const payInMoney = await PayInMoney.create({
      quantity: loanMoney.installmentValue,
      deductionDate: newFinalDate,
      loanMoneyId: loanMoney.id,
    });

    // calculation of loan balance after payment
    const balance = loanMoney.balance - loanMoney.installmentValue;

    // update the balance of the loan
    await loanMoney.update({
      balance,
    });

    // We change the status of the loan in case it is paid
    if (loanMoney.balance === 0) {
      await loanMoney.update({
        status: "pagado ",
        paymentDate: new Date(),
      });
    }

    quantity = payInMoney.quantity;
  }

  // total to deduct
  const totalDeductions =
    health +
    pension +
    quantity +
    deductionAbsence +
    Number(otherDeductions) +
    deductionLicense +
    deductionSuspension;

  // net payable
  const netPayable = totalAccrued - totalDeductions;

  await employeePayroll.update({
    initialDate: newInitialDate,
    finalDate: newFinalDate,
    salary,
    bankAccount,
    payrollDays: days,
    workedDays,
    transportationAssistance: Math.floor(transportationAssistance),
    daysUnfitnessGeneral,
    disabilityValue: Math.floor(disabilityValue),
    daysUnfitnessWorking,
    daysOfAbsence: absenceAccumulator,
    daysOfLicence: licenseAccumulator,
    daysOfSuspension: suspensionAccumulator,
    hDiurnalBasic,
    totalDiurnalBasic: Math.floor(totalDiurnalBasic),
    hNocturnalBasic,
    totalNocturnalBasic: Math.floor(totalNocturnalBasic),
    hDiurnalExtra,
    totalDiurnalExtra: Math.floor(totalDiurnalExtra),
    hNocturnalExtra,
    totalNocturnalExtra: Math.floor(totalNocturnalExtra),
    hFestiveDiurnalBasic,
    totalFestiveDiurnalBasic: Math.floor(totalFestiveDiurnalBasic),
    hFestiveNocturnalBasic,
    totalFestiveNocturnalBasic: Math.floor(totalFestiveNocturnalBasic),
    hFestiveDiurnalExtra,
    totalFestiveDiurnalExtra: Math.floor(totalFestiveDiurnalExtra),
    hFestiveNocturnalExtra,
    totalFestiveNocturnalExtra: Math.floor(totalFestiveNocturnalExtra),
    hCompensated,
    totalCompensatory: Math.floor(totalCompensatory),
    totalAccrued: Math.floor(totalAccrued),
    health: Math.floor(health),
    pension: Math.floor(pension),
    deductionAbsence: Math.floor(deductionAbsence),
    deductionLicense: Math.floor(deductionLicense),
    deductionSuspension: Math.floor(deductionSuspension),
    deductionLoanMoney: Math.floor(quantity),
    otherDeductions: Math.floor(otherDeductions),
    totalDeductions: Math.floor(totalDeductions),
    netPayable: Math.floor(netPayable),
    employeeId,
    overallPayrollId,
  });

  const employeePayrollByOverallPayrollId = await EmployeePayroll.findAll({
    where: { overallPayrollId },
  });

  let totalNetPayable = 0;

  employeePayrollByOverallPayrollId.map((employeePayroll) => {
    totalNetPayable += employeePayroll.netPayable;
  });

  await overallPayroll.update({
    totalPayroll: totalNetPayable,
  });

  res.status(201).json({ status: "success", employeePayroll });
});

const deleteEmployeePayroll = catchAsync(async (req, res, next) => {
  const { employeePayroll } = req;
  await employeePayroll.destroy();
  res.status(201).json({ status: "success" });
});

const getEmployeePayrollByOverallPayrollId = catchAsync(
  async (req, res, next) => {
    const { overallPayrollId } = req.params;

    const employeePayrollByOverallPayrollId = await EmployeePayroll.findAll({
      where: { overallPayrollId, status: "activo" },
      include: [
        {
          model: Employee,
          require: false,
        },
        {
          model: OverallPayroll,
          require: false,
        },
      ],
    });

    res
      .status(201)
      .json({ status: "success", employeePayrollByOverallPayrollId });
  }
);

module.exports = {
  createEmployeePayroll,
  getAllEmployeePayroll,
  getEmployeePayrollById,
  updateEmployeePayroll,
  deleteEmployeePayroll,
  getEmployeePayrollByOverallPayrollId,
  getEmployeePayrollByEmployeeId,
};
