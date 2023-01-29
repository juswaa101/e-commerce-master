const con = require("../../database/connection");
const adminUpdateComplete = (req) => {
  return new Promise((resolve, reject) => {
    con.query("update orders set status = 1 where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      }
      resolve({ status: 200, msg: "Order status updated!" });
    });
  });
};

const adminUpdateCancel = (req) => {
  return new Promise((resolve, reject) => {
    con.query("update orders set status = 2 where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      }
      resolve({ status: 200, msg: "Order status updated!" });
    });
  });
};

module.exports = {
  adminUpdateComplete,
  adminUpdateCancel,
};
