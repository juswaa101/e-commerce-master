const express = require("express");
const app = express.Router();
const { body } = require("express-validator");
const register = require("../controllers/user/registerController");
const productController = require("../controllers/admin/productsController");
const upload = require("../middleware/multer");

app.get("/adminParts", register.hasAuth, productController.adminParts);
app.post(
  "/adminParts",
  register.hasAuth,
  upload.single("img"),
  [
    body("img")
      .custom((value, { req }) => {
        if (req.file.mimetype === "image/jpg") {
          return ".jpg";
        } else if (req.file.mimetype === "image/jpeg") {
          return ".jpeg";
        } else if (req.file.mimetype === "image/png") {
          return ".png";
        } else {
          return false;
        }
      })
      .withMessage("Image must be jpg, jpeg and png only"),
    body("product").notEmpty().withMessage("Product name is required"),
    body("desc").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price")
      .isNumeric()
      .withMessage("Price is required and it is numeric"),
    body("qty")
      .isNumeric()
      .withMessage("Quantity is required and it is numeric"),
  ],
  productController.addProduct
);
app.get(
  "/adminProductEdit/:id",
  register.hasAuth,
  productController.editProduct
);
app.post(
  "/adminProductUpdate",
  register.hasAuth,
  upload.single("img"),
  [
    body("img")
      .custom((value, { req }) => {
        if (req.file.mimetype === "image/jpg") {
          return ".jpg";
        } else if (req.file.mimetype === "image/jpeg") {
          return ".jpeg";
        } else if (req.file.mimetype === "image/png") {
          return ".png";
        } else {
          return false;
        }
      })
      .withMessage("Image must be jpg, jpeg and png only"),
    body("product").notEmpty().withMessage("Product name is required"),
    body("desc").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price")
      .isNumeric()
      .withMessage("Price is required and it is numeric"),
    body("featured")
      .notEmpty()
      .withMessage("Featured is required"),
    body("qty")
      .isNumeric()
      .withMessage("Quantity is required and it is numeric"),
  ],
  productController.updateProduct
);
app.post(
  "/adminProductDelete",
  register.hasAuth,
  productController.deleteProduct
);

module.exports = app;
