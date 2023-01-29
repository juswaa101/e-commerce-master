const categories_service = require("../../services/categories_service");
const { body, validationResult } = require("express-validator");
const index = async (req, res) => {
  const categories = await categories_service.fetchCategory();
  res.render("./admin/adminCategories", { result: categories });
};

const addCategory = async (req, res) => {
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
    const addCategory = await categories_service.addCategory(req);
    res.json(addCategory);
  }
};

const editCategory = async (req, res) => {
  const editCategory = await categories_service.editCategory(req);
  res.json(editCategory);
};

const deleteCategory = async (req, res) => {
  const deleteCategory = await categories_service.deleteCategory(req);
  res.json(deleteCategory);
};

const updateCategory = async (req, res) => {
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
    const updateCategory = await categories_service.updateCategory(req);
    res.json(updateCategory);
  }
};

module.exports = {
  index,
  addCategory,
  editCategory,
  deleteCategory,
  updateCategory,
};
