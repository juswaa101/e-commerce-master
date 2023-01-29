const products_service = require("../../services/products_service");

const con = require("../../database/connection");
const { body, validationResult } = require("express-validator");
const adminParts = async (req, res) => {
  const products = await products_service.fetchProducts();
  con.query("select * from categories", (error, result) => {
    res.render("./admin/adminParts", { result: products, categories: result });
  });
};

const addProduct = async (req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    let obj = {};
    obj[param] = msg;

    return obj;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    res.json({
      status: 400,
      errors: errors.array(),
    });
  } else {
    const addProduct = await products_service.addProducts(req);
    res.json(addProduct);
  }
};

const deleteProduct = async (req, res) => {
  const deleteProduct = await products_service.deleteProduct(req);
  res.json(deleteProduct);
};

const editProduct = async (req, res) => {
  const editProduct = await products_service.editProduct(req);
  res.json(editProduct);
};

const updateProduct = async (req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    let obj = {};
    obj[param] = msg;

    return obj;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    res.json({
      status: 400,
      errors: errors.array(),
    });
  } else {
    const updateProduct = await products_service.updateProduct(req);
    res.json(updateProduct);
  }
};

module.exports = {
  adminParts,
  addProduct,
  editProduct,
  deleteProduct,
  updateProduct,
};
