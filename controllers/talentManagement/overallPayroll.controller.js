// Models
const {
  OverallPayroll,
  EmployeePayroll,
} = require("../../models/talentManagement");

// Utils
const { catchAsync } = require("../../utils/catchAsync.util");
const { AppError } = require("../../utils/appError.util");

const createOverallPayroll = catchAsync(async (req, res, next) => {
  const { typeOfSettlement, description, month, year } = req.body;
  let newMonth = "";

  if (month === "enero") {
    newMonth = "01";
  } else if (month === "febrero") {
    newMonth = "02";
  } else if (month === "marzo") {
    newMonth = "03";
  } else if (month === "abril") {
    newMonth = "04";
  } else if (month === "mayo") {
    newMonth = "05";
  } else if (month === "junio") {
    newMonth = "06";
  } else if (month === "julio") {
    newMonth = "07";
  } else if (month === "agosto") {
    newMonth = "08";
  } else if (month === "septiembre") {
    newMonth = "09";
  } else if (month === "octubre") {
    newMonth = "10";
  } else if (month === "noviembre") {
    newMonth = "11";
  } else if (month === "diciembre") {
    newMonth = "12";
  }

  let date = "";
  let initialDate = "";
  let finalDate = "";

  if (typeOfSettlement === "mensual") {
    date = `01/${newMonth}/${year} - 30/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/01`);
    finalDate = new Date(`${year}/${newMonth}/30`);
  } else if (typeOfSettlement === "primera quincena") {
    date = `01/${newMonth}/${year} - 15/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/01`);
    finalDate = new Date(`${year}/${newMonth}/15`);
  } else if (typeOfSettlement === "segunda quincena") {
    date = `16/${newMonth}/${year} - 30/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/16`);
    finalDate = new Date(`${year}/${newMonth}/30`);
  }

  const newOverallPayroll = await OverallPayroll.create({
    typeOfSettlement,
    description,
    month: Number(newMonth),
    year,
    paymentPeriod: date,
    initialDate,
    finalDate,
  });

  await newOverallPayroll.update({
    status: "En proceso",
  });

  res.status(201).json({
    status: "success",
    newOverallPayroll,
  });
});

const getAllOverallPayroll = catchAsync(async (req, res, next) => {
  const overallPayroll = await OverallPayroll.findAll();
  res.status(201).json({
    status: "success",
    overallPayroll,
  });
});

const getOverallPayrollById = catchAsync(async (req, res, next) => {
  const { overallPayroll } = req;

  const employeePayroll = await EmployeePayroll.findAll({
    where: {
      initialDate: overallPayroll.initialDate,
      finalDate: overallPayroll.finalDate,
    },
  });

  res.status(201).json({
    status: "success",
    overallPayroll,
    employeePayroll,
  });
});

const updateOverallPayroll = catchAsync(async (req, res, next) => {
  const { overallPayroll } = req;
  const { typeOfSettlement, description, month, year } = req.body;

  let newMonth = "";
  const overallPayrollDate = await OverallPayroll.findAll();

  const newInitialDate = new Date(overallPayrollDate.initialDate);
  const newFinalDate = new Date(overallPayrollDate.finalDate);

  if (overallPayrollDate) {
    for (let i = 0; i < overallPayrollDate.length; i++) {
      if (
        new Date(overallPayrollDate[i].initialDate).getTime() ===
          newInitialDate.getTime() &&
        new Date(overallPayrollDate[i].finalDate).getTime() ===
          newFinalDate.getTime()
      ) {
        return next(
          new AppError("Ya existe una nómina con la misma fecha", 404)
        );
      }
    }
  }

  if (month === "1") {
    newMonth = "01";
  } else if (month === "2") {
    newMonth = "02";
  } else if (month === "3") {
    newMonth = "03";
  } else if (month === "4") {
    newMonth = "04";
  } else if (month === "5") {
    newMonth = "05";
  } else if (month === "6") {
    newMonth = "06";
  } else if (month === "7") {
    newMonth = "07";
  } else if (month === "8") {
    newMonth = "08";
  } else if (month === "9") {
    newMonth = "09";
  } else {
    newMonth = month;
  }

  let date = "";
  let initialDate = "";
  let finalDate = "";

  if (typeOfSettlement === "mensual") {
    date = `01/${newMonth}/${year} - 30/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/01`);
    finalDate = new Date(`${year}/${newMonth}/30`);
  } else if (typeOfSettlement === "primera quincena") {
    date = `01/${newMonth}/${year} - 15/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/01`);
    finalDate = new Date(`${year}/${newMonth}/15`);
  } else if (typeOfSettlement === "segunda quincena") {
    date = `16/${newMonth}/${year} - 30/${newMonth}/${year}`;
    initialDate = new Date(`${year}/${newMonth}/16`);
    finalDate = new Date(`${year}/${newMonth}/30`);
  }

  const employeePayroll = await EmployeePayroll.findAll({
    where: { overallPayrollId: overallPayroll.id },
  });

  let total = 0;
  if (employeePayroll.length > 0) {
    employeePayroll.map((employeePayroll) => {
      total += employeePayroll.netPayable;
    });
  }

  await overallPayroll.update({
    typeOfSettlement,
    description,
    month: Number(newMonth),
    year,
    paymentPeriod: date,
    initialDate,
    finalDate,
    totalPayroll: total,
  });

  res.status(201).json({ status: "success", overallPayroll });
});

const deleteOverallPayroll = catchAsync(async (req, res, next) => {
  const { overallPayroll } = req;
  await overallPayroll.destroy();
  res.status(201).json({ status: "success" });
});

const finishPayroll = catchAsync(async (req, res, next) => {
  const { overallPayroll } = req;

  const employeePayroll = await EmployeePayroll.findAll({
    where: { overallPayrollId: overallPayroll.id },
  });

  let total = 0;
  if (employeePayroll.length > 0) {
    employeePayroll.map((employeePayroll) => {
      total += employeePayroll.netPayable;
    });
  }

  await overallPayroll.update({
    totalPayroll: total,
    status: "Terminada",
  });
  res.status(200).json({ status: "success", overallPayroll });
});

module.exports = {
  createOverallPayroll,
  getAllOverallPayroll,
  getOverallPayrollById,
  updateOverallPayroll,
  deleteOverallPayroll,
  finishPayroll,
};
