const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  // Extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Sesión invalida", 403));
  }

  // Ask JWT (library), if the token is still valid
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // { id, ... }

  // Check in db that user still exists
  const user = await User.findOne({
    where: { id: decoded.id, status: "activo" },
  });

  if (!user) {
    return next(new AppError("El dueño de este token ya no existe.", 403));
  }

  // Grant access
  req.sessionUser = user;
  next();
});

const protectUserAccount = catchAsync(async (req, res, next) => {
  // const { id } = req.params -> Alternative
  const { sessionUser, user } = req;

  // If the id's don't match, return error (403)
  if (sessionUser.id !== user.id) {
    return next(new AppError("No eres dueño de esta cuenta", 403));
  }

  next();
});

const userAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(new AppError("Se requiere permiso de administrador", 403));
  }
  next();
});

module.exports = { protectSession, protectUserAccount, userAdmin };
