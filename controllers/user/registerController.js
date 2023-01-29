const authenticate_service = require("../../services/authenticate_service");
const { body, validationResult } = require("express-validator");

const loginPage = (req, res) => {
  res.render("./user/login");
};

const login = async (req, res) => {
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
    const authUser = await authenticate_service.loginAuth(req);
    res.json(authUser);
  }
};

const adminLogin = (req, res) => {
  res.render("./admin/adminLogin");
};

const authAdminLogin = (req, res) => {
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
    if (
      req.body.email === "admin@gmail.com" &&
      req.body.password === "admin123"
    ) {
      req.session.name = "admin";
      req.session.email = "admin@gmail.com";
      res.json({
        status: 200,
        msg: "Success",
      });
    } else {
      res.json({ status: 400, msg: "Incorrect email or password" });
    }
  }
};

const registerPage = (req, res) => {
  res.render("./user/register");
};

const register = async (req, res) => {
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
    const user = await authenticate_service.checkIfEmailExists(req);
    res.json(user);
  }
};

const hasAuth = (req, res, next) => {
  if (!req.session.email && !req.session.name) {
    res.redirect("/login");
  } else {
    next();
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  loginPage,
  login,
  adminLogin,
  registerPage,
  register,
  logout,
  hasAuth,
  authAdminLogin,
};
