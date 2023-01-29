const express = require("express");
const app = express.Router();
const registerController = require("../controllers/user/registerController");
const { body } = require("express-validator");
const userManagementController = require("../controllers/admin/userManagementController");

app.get(
  "/adminUsers",
  registerController.hasAuth,
  userManagementController.adminUsers
);
app.post(
  "/adminUserDelete",
  registerController.hasAuth,
  userManagementController.adminUserDelete
);
app.get(
  "/adminUserEdit/:id",
  registerController.hasAuth,
  userManagementController.adminUserEdit
);

app.post(
  "/adminUserEdit",
  registerController.hasAuth,
  [
    body("name").notEmpty().withMessage("Full name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("email")
      .isEmail()
      .withMessage("Email is required, and use a valid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is required atleast 8 characters long"),
  ],
  userManagementController.adminUserUpdate
);

module.exports = app;
