const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
// const { Email } = require('../utils/email.util');

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ where: { status: "activo" } });

  res.status(201).json({
    status: "success",
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  // Send welcome email
  // await new Email(email).sendWelcome(name);

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(201).json({
    status: "success",
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, password } = req.body;

  await user.update({ username, password });

  res.status(201).json({ status: "success", user });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  // await user.destroy();
  await user.update({ status: "in-activo" });

  res.status(201).json({ status: "success" });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate credentials (email)
  const user = await User.findOne({
    where: {
      email,
      status: "activo",
    },
  });

  if (!user) {
    return next(new AppError("Credenciales invalidas", 400));
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError("Credenciales invalidas", 400));
  }

  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "360d",
  });

  console.log("token login");
  console.log(token);

  // Send response
  res.status(200).json({
    status: "success",
    token,
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
