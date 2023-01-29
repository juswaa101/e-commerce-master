const express = require("express");
const app = express.Router();
const { body } = require("express-validator");
const registerController = require("../controllers/user/registerController");

//login and register
app.get("/login", registerController.loginPage);
app.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Email is required, and use a valid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is required atleast 8 characters long"),
  ],
  registerController.login
);
app.get("/register", registerController.registerPage);
app.post(
  "/register",
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
  registerController.register
);

app.get("/logout", registerController.logout);

module.exports = app;
