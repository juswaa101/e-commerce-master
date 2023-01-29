const con = require("../../database/connection");
const userOrder = (req) => {
  return new Promise((resolve, reject) => {
    const user = getUser(req);
    user
      .then((res) => {
        con.query(
          "select * from orders INNER JOIN products ON orders.product_id = products.id where orders.user_id = ? and orders.status = 0",
          [res[0].id],
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getUser = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from users where email = ?",
      [req.session.email],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const userOrderComplete = (req) => {
  return new Promise((resolve, reject) => {
    const user = getUser(req);
    user
      .then((res) => {
        con.query(
          "select * from orders INNER JOIN products ON orders.product_id = products.id where orders.user_id = ? and orders.status = 1",
          [res[0].id],
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const userOrderCancelled = (req) => {
  return new Promise((resolve, reject) => {
    const user = getUser(req);
    user
      .then((res) => {
        con.query(
          "select * from orders INNER JOIN products ON orders.product_id = products.id where orders.user_id = ? and orders.status = 2",
          [res[0].id],
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const placeOrder = (req) => {
  return new Promise((resolve, reject) => {
    removeCart(req);
    con.query(
      "insert into orders values (NULL, ?, ?, 0, NULL, now(), NULL)",
      [req.body.user_id, req.body.product_id],
      (error) => {
        if (error) {
          reject(error);
        }
        resolve({ status: 200, msg: "Ordered place successfully!" });
      }
    );
  });
};

const removeCart = (req) => {
  con.query("delete from cart where id = ?", [req.body.cart_id], (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = {
  userOrder,
  getUser,
  userOrderCancelled,
  userOrderComplete,
  placeOrder,
};
