const { body, validationResult } = require("express-validator");

const { AppError } = require("../../utils/appError.util");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);
    const message = errorMsgs.join(". ");
    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidators = [
  body("username")
    .notEmpty()
    .withMessage("Usuario no puede estar vacio")
    .isString()
    .withMessage("Usuario debe ser texo"),
  body("email")
    .notEmpty()
    .withMessage("Email no puede estar vacio")
    .isEmail()
    .withMessage("Email no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña debe tener una longitud minima de 8 caracteres")
    .isAlphanumeric()
    .withMessage("Contraseña debe contener numeros y letras"),
  body("role")
    .notEmpty()
    .withMessage("Rol no puede estar vacio")
    .isString()
    .withMessage("Rol debe ser texto"),
  checkResult,
];

const createCompanyValidators = [
  body("companyName")
    .notEmpty()
    .withMessage("Nombre de compañia no puede estar vacio")
    .isString()
    .withMessage("Nombre de compañia debe ser texto"),
  body("nit")
    .notEmpty()
    .withMessage("Nit no puede estar vacio")
    .isString()
    .withMessage("Nit debe ser texto"),
  body("address")
    .notEmpty()
    .withMessage("Direccion no puede estar vacio")
    .isString()
    .withMessage("Direccion debe ser texto"),
  body("city")
    .notEmpty()
    .withMessage("Ciudad no puede estar vacio")
    .isString()
    .withMessage("Ciudad debe ser texto"),
  body("phone")
    .notEmpty()
    .withMessage("Telefono no puede estar vacio")
    .isString()
    .withMessage("Telefono debe ser texto"),
  body("email")
    .notEmpty()
    .withMessage("Email no puede estar vacio")
    .isEmail()
    .withMessage("Email no valido"),
  checkResult,
];

const createEmployeeValidators = [
  body("names")
    .notEmpty()
    .withMessage("Nombres no pueden estar vacios")
    .isString()
    .withMessage("Nombres debe ser texto"),
  body("identification")
    .notEmpty()
    .withMessage("Identificacion no puede estar vacia")
    .isString()
    .withMessage("Identificacion debe ser texto"),
  // body("bankAccount")
  //   .notEmpty()
  //   .withMessage("Cuenta bancaria no puede estar vacia")
  //   .isString()
  //   .withMessage("Cuenta bancaria debe ser texto"),
  // body("gender")
  //   .notEmpty()
  //   .withMessage("Genero no puede estar vacio")
  //   .isString()
  //   .withMessage("Genero debe ser texto"),
  // body("birthday")
  //   .notEmpty()
  //   .withMessage("Cumpleaños no puede estar vacio")
  //   .isDate(["YYYY-MM-DD"])
  //   .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  // body("bloodTypes")
  //   .notEmpty()
  //   .withMessage("Tipo de sangre no puede estar vacio")
  //   .isString()
  //   .withMessage("Tipo de sangre debe ser texto"),
  // body("rh")
  //   .notEmpty()
  //   .withMessage("RH no puede estar vacio")
  //   .isString()
  //   .withMessage("RH debe ser texto"),
  body("phone").notEmpty().withMessage("Telefono no puede estar vacio"),
  // body("city")
  //   .notEmpty()
  //   .withMessage("Ciudad no puede estar vacio")
  //   .isString()
  //   .withMessage("Ciudad debe ser texto"),
  // body("address")
  //   .notEmpty()
  //   .withMessage("Direccion no puede estar vacio")
  //   .isString()
  //   .withMessage("Direccion debe ser texto"),
  // body("email")
  //   .notEmpty()
  //   .withMessage("Email no puede estar vacio")
  //   .isString()
  //   .withMessage("Email debe ser texto"),
  // body("studies")
  //   .notEmpty()
  //   .withMessage("Estudios no puede estar vacio")
  //   .isString()
  //   .withMessage("Estudios debe ser texto"),

  checkResult,
];

const createContractValidators = [
  // body("typeContract")
  //   .notEmpty()
  //   .withMessage("Tipo de contrato no puede estar vacio")
  //   .isString()
  //   .withMessage("Tipo de contrato debe ser texto"),
  body("salary")
    .notEmpty()
    .withMessage("Salario no puede estar vacio")
    .isNumeric()
    .withMessage("Salario debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("salary no puede ser un valor negativo"),
  // body("position")
  //   .notEmpty()
  //   .withMessage("Cargo de contrato no puede estar vacio")
  //   .isString()
  //   .withMessage("Cargo debe ser texto"),
  body("initialDate")
    .notEmpty()
    .withMessage("Fecha inicial no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("finalDate")
    .notEmpty()
    .withMessage("Fecha final no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createExtensionValidators = [
  body("initialDate")
    .notEmpty()
    .withMessage("Fecha inicial no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("finalDate")
    .notEmpty()
    .withMessage("Fecha final no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("contractId")
    .notEmpty()
    .withMessage("contractId no puede estar vacio")
    .isNumeric()
    .withMessage("contractId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("contractId no puede ser un valor negativo"),
  checkResult,
];

const createEmployeePayrollValidators = [
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  body("overallPayrollId")
    .notEmpty()
    .withMessage("overallPayrollId no puede estar vacio")
    .isNumeric()
    .withMessage("overallPayrollId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("overallPayrollId no puede ser un valor negativo"),
  checkResult,
];

const createOverallPayrollValidators = [
  body("typeOfSettlement")
    .notEmpty()
    .withMessage("typeOfSettlement no puede estar vacio")
    .isString()
    .withMessage("typeOfSettlement debe ser texto")
    .custom(
      (val) =>
        val === "mensual" ||
        val === "primera quincena" ||
        val === "segunda quincena"
    ),
  body("description")
    .notEmpty()
    .withMessage("description no puede estar vacio")
    .isString()
    .withMessage("description debe ser texto"),
  body("month")
    .notEmpty()
    .withMessage("month no puede estar vacio")
    .isString()
    .withMessage("month debe ser texto")
    .custom(
      (val) =>
        val === "enero" ||
        val === "febrero" ||
        val === "marzo" ||
        val === "abril" ||
        val === "mayo" ||
        val === "junio" ||
        val === "julio" ||
        val === "agosto" ||
        val === "septiembre" ||
        val === "octubre" ||
        val === "noviembre" ||
        val === "diciembre"
    ),
  body("year")
    .notEmpty()
    .withMessage("año no puede estar vacio")
    .isNumeric()
    .withMessage("año debe ser un numero"),
  checkResult,
];

const createLoanMoneyValidators = [
  body("quantity")
    .notEmpty()
    .withMessage("Valor prestamo no puede estar vacio")
    .isNumeric()
    .withMessage("Valor prestamo debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Valor prestamo no puede ser un valor negativo"),
  body("numberAmount")
    .notEmpty()
    .withMessage("Numero de coutas no puede estar vacio")
    .isNumeric()
    .withMessage("Numero de coutas debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Numero de coutas no puede ser un valor negativo"),
  body("outlayDate")
    .notEmpty()
    .withMessage("Fecha desembolso no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("personAuthorizes")
    .notEmpty()
    .withMessage("Persona que autoriza no puede estar vacio")
    .isString()
    .withMessage("Persona que autoriza debe ser texto"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Medio de pago no puede estar vacio")
    .isString()
    .withMessage("Medio de pago debe ser texto"),
  body("cause")
    .notEmpty()
    .withMessage("Motivo no puede estar vacio")
    .isString()
    .withMessage("Motivo debe ser texto"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createMissingWorkValidators = [
  body("cause")
    .notEmpty()
    .withMessage("Motivo no puede estar vacio")
    .isString()
    .withMessage("Motivo debe ser texto")
    .custom(
      (val) => val === "licencia" || val === "ausencia" || val === "suspension"
    )
    .withMessage("Motivo invalido"),
  body("observation")
    .notEmpty()
    .withMessage("Observacion no puede estar vacio")
    .isString()
    .withMessage("Observacion debe ser texto"),
  // body("initialDate")
  //   .notEmpty()
  //   .withMessage("Fecha inicial no puede estar vacio")
  //   .isDate(["YYYY-MM-DD"])
  //   .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  // body("finalDate")
  //   .notEmpty()
  //   .withMessage("Fecha final no puede estar vacio")
  //   .isDate(["YYYY-MM-DD"])
  //   .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("paidOut")
    .notEmpty()
    .withMessage("Descontable no puede estar vacio")
    .isBoolean()
    .withMessage("Descontable debe ser s/n"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createUnfitnessValidators = [
  body("origin")
    .notEmpty()
    .withMessage("Origen no puede estar vacio")
    .isString()
    .withMessage("Origen debe ser texto")
    .custom((val) => val === "general" || val === "laboral")
    .withMessage("Origen invalido"),
  body("diagnostic")
    .notEmpty()
    .withMessage("Diagnostico no puede estar vacio")
    .isString()
    .withMessage("Diagnostico debe ser texto"),
  // body("initialDate")
  //   .notEmpty()
  //   .withMessage("Fecha inicial no puede estar vacio")
  //   .isDate(["YYYY-MM-DD"])
  //   .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  // body("finalDate")
  //   .notEmpty()
  //   .withMessage("Fecha final no puede estar vacio")
  //   .isDate(["YYYY-MM-DD"])
  //   .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createLiquidationValidators = [
  body("finalDate")
    .notEmpty()
    .withMessage("Fecha final no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("initialDateBonus")
    .notEmpty()
    .withMessage("Fecha inicial prima no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("finalDateBonus")
    .notEmpty()
    .withMessage("Fecha final prima no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("transportationAssistance")
    .notEmpty()
    .withMessage("Auxilio de transporte no puede estar vacio")
    .isNumeric()
    .withMessage("Auxilio de transporte debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Auxilio de transporte no puede ser un valor negativo"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createSalaryIncreaseValidators = [
  body("salary")
    .notEmpty()
    .withMessage("Salario no puede estar vacio")
    .isNumeric()
    .withMessage("Salario debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Salario no puede ser un valor negativo"),
  body("dateIncrease")
    .notEmpty()
    .withMessage("Fecha de aumento no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("cause")
    .notEmpty()
    .withMessage("Motivo no puede estar vacio")
    .isString()
    .withMessage("Motivo debe ser texto"),
  body("personAuthorizes")
    .notEmpty()
    .withMessage("Persona que autoriza no puede estar vacio")
    .isString()
    .withMessage("Persona que autoriza debe ser texto"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createBonusServiceValidators = [
  body("initialDate")
    .notEmpty()
    .withMessage("Fecha inicial no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("finalDate")
    .notEmpty()
    .withMessage("Fecha final no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("transportationAssistance")
    .notEmpty()
    .withMessage("Auxilio de transporte no puede estar vacio")
    .isNumeric()
    .withMessage("Auxilio de transporte debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Auxilio de transporte no puede ser un valor negativo"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createSocialSecurityValidators = [
  body("arl")
    .notEmpty()
    .withMessage("ARL no puede estar vacio")
    .isString()
    .withMessage("ARL debe ser texto"),
  body("compensationBox")
    .notEmpty()
    .withMessage("Caja de compensacion no puede estar vacio")
    .isString()
    .withMessage("Caja de compensacion debe ser texto"),
  body("eps")
    .notEmpty()
    .withMessage("EPS no puede estar vacio")
    .isString()
    .withMessage("EPS debe ser texto"),
  body("afp")
    .notEmpty()
    .withMessage("Fondo de pension no puede estar vacio")
    .isString()
    .withMessage("Fondo de pension debe ser texto"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createEndowmentValidators = [
  body("pants")
    .notEmpty()
    .withMessage("Pantalon no puede estar vacio")
    .isString()
    .withMessage("Pantalon debe ser texto"),
  body("shirt")
    .notEmpty()
    .withMessage("Camisa no puede estar vacio")
    .isString()
    .withMessage("Camisa debe ser texto"),
  body("shod")
    .notEmpty()
    .withMessage("Calzado no puede estar vacio")
    .isString()
    .withMessage("Calzado debe ser texto"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createEndowmentDeliveryValidators = [
  body("date")
    .notEmpty()
    .withMessage("Fecha no puede estar vacio")
    .isDate(["YYYY-MM-DD"])
    .withMessage("Formato invalido, use 'YYYY-MM-DD'"),
  body("pants")
    .notEmpty()
    .withMessage("Pantalon no puede estar vacio")
    .isBoolean()
    .withMessage("Pantalon debe ser s/n"),
  body("shirt")
    .notEmpty()
    .withMessage("Camisa no puede estar vacio")
    .isBoolean()
    .withMessage("Camisa debe ser s/n"),
  body("shod")
    .notEmpty()
    .withMessage("Calzado no puede estar vacio")
    .isBoolean()
    .withMessage("Calzado debe ser s/n"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createHealthyLifeValidators = [
  body("hobby")
    .notEmpty()
    .withMessage("Pasatiempo no puede estar vacio")
    .isString()
    .withMessage("Pasatiempo debe ser texto"),
  body("alcoholConsumption")
    .notEmpty()
    .withMessage("Consumo de alcohol no puede estar vacio")
    .isBoolean()
    .withMessage("Consumo de alcohol debe ser s/n"),
  body("tobaccoUse")
    .notEmpty()
    .withMessage("Consumo de tabaco no puede estar vacio")
    .isBoolean()
    .withMessage("Consumo de tabaco debe ser s/n"),
  body("sports")
    .notEmpty()
    .withMessage("Deportes no puede estar vacio")
    .isString()
    .withMessage("Deportes debe ser texto"),
  body("conveyance")
    .notEmpty()
    .withMessage("Medio de transporte no puede estar vacio")
    .isString()
    .withMessage("Medio de transporte debe ser texto"),
  body("allergyMedicine")
    .notEmpty()
    .withMessage("Alergia medicamentos no puede estar vacio")
    .isString()
    .withMessage("Alergia medicamentos debe ser texto"),
  body("diseases")
    .notEmpty()
    .withMessage("Enfermedades no puede estar vacio")
    .isString()
    .withMessage("Enfermedades debe ser texto"),
  body("operations")
    .notEmpty()
    .withMessage("Operaciones no puede estar vacio")
    .isString()
    .withMessage("Operaciones debe ser texto"),
  body("medicines")
    .notEmpty()
    .withMessage("Medicamentos no puede estar vacio")
    .isString()
    .withMessage("Medicamentos debe ser texto"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

const createFamilyInformationValidators = [
  body("maritalStatus")
    .notEmpty()
    .withMessage("Estado civil no puede estar vacio")
    .isString()
    .withMessage("Estado civil debe ser texto"),
  body("dependents")
    .notEmpty()
    .withMessage("Dependientes no puede estar vacio")
    .isNumeric()
    .withMessage("Dependientes debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Dependientes no puede ser un valor negativo"),
  body("numberOfChildren")
    .notEmpty()
    .withMessage("Numero de hijos no puede estar vacio")
    .isNumeric()
    .withMessage("Numero de hijos debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Numero de hijos no puede ser un valor negativo"),
  body("ageOfChildren")
    .notEmpty()
    .withMessage("Edad de hijos no puede estar vacio")
    .isString()
    .withMessage("Edad de hijos debe ser texto"),
  body("emergencyNumber")
    .notEmpty()
    .withMessage("Numero de emergencias no puede estar vacio")
    .isString()
    .withMessage("Numero de emergencias debe ser texto"),
  body("typeOfHousing")
    .notEmpty()
    .withMessage("Tipo de vivienda no puede estar vacio")
    .isString()
    .withMessage("Tipo de vivienda debe ser texto"),
  body("socialStratum")
    .notEmpty()
    .withMessage("Estrato social no puede estar vacio")
    .isNumeric()
    .withMessage("Estrato social debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("Estrato social no puede ser un valor negativo"),
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId no puede estar vacio")
    .isNumeric()
    .withMessage("employeeId debe ser un numero")
    .custom((val) => val > 0)
    .withMessage("employeeId no puede ser un valor negativo"),
  checkResult,
];

module.exports = {
  createUserValidators,
  createCompanyValidators,
  createEmployeeValidators,
  createContractValidators,
  createExtensionValidators,
  createEmployeePayrollValidators,
  createOverallPayrollValidators,
  createLoanMoneyValidators,
  createMissingWorkValidators,
  createUnfitnessValidators,
  createLiquidationValidators,
  createSalaryIncreaseValidators,
  createBonusServiceValidators,
  createSocialSecurityValidators,
  createEndowmentValidators,
  createEndowmentDeliveryValidators,
  createHealthyLifeValidators,
  createFamilyInformationValidators,
};
