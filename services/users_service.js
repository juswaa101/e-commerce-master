const con = require("../database/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    con.query("select * from users order by full_name", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteUser = (req) => {
  return new Promise((resolve, reject) => {
    con.query("delete from users where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ status: 200, msg: "User deleted successfully!" });
      }
    });
  });
};

const editUser = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from users where id = ?",
      [req.params.id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ status: 200, user: result });
        }
      }
    );
  });
};

const updateUser = (req) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      con.query(
        "update users set full_name = ?, address = ?, email = ?, password = ?, updated_at = now() where id = ?",
        [req.body.name, req.body.address, req.body.email, hash, req.body.id],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({ status: 200, msg: "User updated successfully" });
          }
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
          updateUser(req);
          resolve({ status: 200, msg: "Success" });
        }
      }
    );
  });
};

module.exports = {
  fetchUsers,
  deleteUser,
  editUser,
  updateUser,
  checkIfEmailExists,
};
