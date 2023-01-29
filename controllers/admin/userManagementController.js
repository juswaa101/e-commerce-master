const user_service = require("../../services/users_service");
const { body, validationResult } = require("express-validator");

const adminUsers = async (req, res) => {
  const users = await user_service.fetchUsers();
  res.render("./admin/adminUsers", { result: users });
};

const adminUserDelete = async (req, res) => {
  const userDelete = await user_service.deleteUser(req);
  res.json(userDelete);
};

const adminUserEdit = async (req, res) => {
  const userEdit = await user_service.editUser(req);
  res.json(userEdit);
};

const adminUserUpdate = async (req, res) => {
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
    const userUpdate = await user_service.checkIfEmailExists(req);
    res.json(userUpdate);
  }
};

module.exports = {
  adminUsers,
  adminUserDelete,
  adminUserEdit,
  adminUserUpdate,
};
