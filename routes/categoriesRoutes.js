const express = require("express");
const app = express.Router();
const { body } = require("express-validator");
const categoriesController = require("../controllers/admin/categoriesController");
const registerController = require("../controllers/user/registerController");

app.get(
  "/adminCategories",
  registerController.hasAuth,
  categoriesController.index
);
app.post(
  "/adminCategories",
  registerController.hasAuth,
  [body("category").notEmpty().withMessage("Category is required")],
  categoriesController.addCategory
);
app.get(
  "/adminCategoriesEdit/:id",
  registerController.hasAuth,
  categoriesController.editCategory
);
app.post(
  "/adminCategoriesDelete",
  registerController.hasAuth,
  categoriesController.deleteCategory
);
app.post(
  "/adminCategoriesUpdate",
  registerController.hasAuth,
  [body("category").notEmpty().withMessage("Category is required")],
  categoriesController.updateCategory
);

module.exports = app;
