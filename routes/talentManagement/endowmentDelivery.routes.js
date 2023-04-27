const express = require("express");

// Controllers
const {
  createEndowmentDelivery,
  getAllEndowmentDelivery,
  updateEndowmentDelivery,
  deleteEndowmentDelivery,
} = require("../../controllers/talentManagement/endowmentDelivery.controller");

// Middlewares
const {
  createEndowmentDeliveryValidators,
  endowmentDeliveryExists,
  employeeExists,
} = require("../../middlewares/talentManagement");
const {
  protectSession,
  userAdmin,
} = require("../../middlewares/auth.middleware");

const endowmentDeliveryRouter = express.Router();

endowmentDeliveryRouter.use(protectSession);

endowmentDeliveryRouter.get("/", getAllEndowmentDelivery);

endowmentDeliveryRouter.use(userAdmin);

endowmentDeliveryRouter.post(
  "/",
  createEndowmentDeliveryValidators,
  employeeExists,
  createEndowmentDelivery
);

endowmentDeliveryRouter
  .use("/:id", endowmentDeliveryExists)
  .route("/:id")
  .patch(updateEndowmentDelivery)
  .delete(deleteEndowmentDelivery);

module.exports = { endowmentDeliveryRouter };
