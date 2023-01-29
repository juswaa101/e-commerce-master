const con = require("../../database/connection");

const adminDashboard = async (req, res) => {
  const userCount = await user_count();
  const productCount = await product_count();
  const ordersCount = await orders_count();
  const orderCompletedCount = await order_compeleted_count();
  res.render("./admin/adminDashboard", {
    user_count: userCount,
    product_count: productCount,
    orders_count: ordersCount,
    orders_compeleted_count: orderCompletedCount,
  });
};

const adminProfile = (req, res) => {
  res.render("./admin/adminProfile");
};

const user_count = () => {
  return new Promise((resolve, reject) => {
    con.query("select count(*) as user_count from users", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const product_count = () => {
  return new Promise((resolve, reject) => {
    con.query(
      "select count(*) as product_count from products",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const orders_count = () => {
  return new Promise((resolve, reject) => {
    con.query("select count(*) as orders_count from orders", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const order_compeleted_count = () => {
  return new Promise((resolve, reject) => {
    con.query("select count(*) as orders_completed_count from orders where status = 1", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  adminDashboard,
  adminProfile,
};
