const express = require("express");
const app = express.Router();
const { body } = require("express-validator");
const registerController = require("../controllers/user/registerController");
const adminPageController = require("../controllers/admin/adminPageController");

//admin
app.get("/admin", registerController.adminLogin);
app.post(
  "/admin",
  [
    body("email")
      .isEmail()
      .withMessage("Email is required, and use a valid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is required atleast 8 characters long"),
  ],
  registerController.authAdminLogin
);
app.get(
  "/adminDashboard",
  registerController.hasAuth,
  adminPageController.adminDashboard
);
app.get(
  "/adminProfile",
  registerController.hasAuth,
  adminPageController.adminProfile
);

module.exports = app;
