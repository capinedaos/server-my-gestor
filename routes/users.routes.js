const express = require("express");

// Controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

// Middlewares
const { createUserValidators } = require("../middlewares/talentManagement");
const { userExists } = require("../middlewares/users.middleware");
const {
  protectSession,
  protectUserAccount,
  userAdmin,
} = require("../middlewares/auth.middleware");

const usersRouter = express.Router();

usersRouter.post("/register", createUserValidators, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.use(userAdmin);

usersRouter.get("/", getAllUsers);

usersRouter
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
