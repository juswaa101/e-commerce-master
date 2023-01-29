const con = require("../database/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = (req) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      con.query(
        "insert into users values (NULL,?,?,?,?,now(),now())",
        [req.body.name, req.body.address, req.body.email, hash],
        (error) => {
          if (error) {
            reject(error.message);
          }
          resolve({ status: 200, msg: "Registered successfully" });
        }
      );
    });
  });
};

const checkIfEmailExists = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from users where email = ?",
      [req.body.email],
      (error, results) => {
        if (error) {
          reject(error.message);
        }

        if (results.length > 0) {
          resolve({ status: 400, msg: "Email already exists" });
        } else {
          createUser(req);
          resolve({ status: 200, msg: "Success" });
        }
      }
    );
  });
};

const loginAuth = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from users where email = ?",
      [req.body.email, req.body.password],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.length > 0) {
            bcrypt
              .compare(req.body.password, result[0].password)
              .then(function (match) {
                if (match) {
                  req.session.email = req.body.email;
                  req.session.name = result[0].full_name;
                  resolve({ status: 200, msg: `Login Success` });
                } else {
                  resolve({ status: 400, msg: "Incorrect email or password" });
                }
              });
          } else {
            resolve({ status: 400, msg: "Email or password is incorrect" });
          }
        }
      }
    );
  });
};

module.exports = {
  createUser,
  loginAuth,
  checkIfEmailExists,
};
