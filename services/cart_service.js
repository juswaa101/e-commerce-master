const con = require("../database/connection");

const fetchCart = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select *, cart.id as cid, products.id as pid, users.id as uid from cart INNER JOIN products " +
        "on cart.product_id = products.id " +
        "INNER JOIN users on cart.user_id = users.id" +
        " where cart.user_id = ?",
      [req.params.id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const addCart = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "insert into cart values (NULL, ?, ?, ?, ?)",
      [req.body.product_id, req.body.user_id, req.body.qty, req.body.added_at],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const deleteCart = (req) => {
  return new Promise((resolve, reject) => {
    con.query("delete from cart where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      }
      resolve({ status: 200, msg: "Cart removed" });
    });
  });
};

const fetchNotification = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select count(*) as cart_notification from cart where user_id = ?",
      [req.params.id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

module.exports = {
  fetchCart,
  addCart,
  deleteCart,
  fetchNotification,
};
