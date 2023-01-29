const userOrderService = require("../../services/orders/userOrderService");
const adminOrderService = require("../../services/orders/adminOrderService");

const con = require("../../database/connection");
const adminOrders = (req, res) => {
  con.query(
    "select *, orders.id as oid, products.id as pid, users.id as uid from orders " +
      "INNER JOIN products ON orders.product_id = products.id " +
      "INNER JOIN users ON orders.user_id = users.id" +
      " where orders.status = 0",
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.render("./admin/adminOrders", { result: result });
    }
  );
};

const adminShipped = (req, res) => {
  res.render("./admin/adminShipped");
};

const adminCompleted = (req, res) => {
  con.query(
    "select * from orders " +
      "INNER JOIN products ON orders.product_id = products.id " +
      "INNER JOIN users ON orders.user_id = users.id" +
      " where orders.status = 1",
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.render("./admin/adminCompleted", { result: result });
    }
  );
};

const adminCancelled = (req, res) => {
  con.query(
    "select * from orders " +
      "INNER JOIN products ON orders.product_id = products.id " +
      "INNER JOIN users ON orders.user_id = users.id" +
      " where orders.status = 2",
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.render("./admin/adminCancelled", { result: result });
    }
  );
};

const updateOrderToCompleted = async (req, res) => {
  const updateOrderToCompleted = await adminOrderService.adminUpdateComplete(req);
  res.json(updateOrderToCompleted); 
};

const updateOrderToCancel = async (req, res) => {
  const updateOrderToCancel = await adminOrderService.adminUpdateCancel(req);
  res.json(updateOrderToCancel); 
};

const orders = async (req, res) => {
  const userOrder = await userOrderService.userOrder(req);
  con.query(
    "select * from users where email = ?",
    [req.session.email],
    (error, user) => {
      if (error) {
        reject(error);
      }
      res.render("./user/orders", {
        name: req.session.name,
        email: req.session.email,
        orders: userOrder,
        user: user,
      });
    }
  );
};

const placeOrder = async (req, res) => {
  const placeOrder = await userOrderService.placeOrder(req);
  res.json(placeOrder);
};

const orderCompleted = async (req, res) => {
  const userOrderComplete = await userOrderService.userOrderComplete(req);

  con.query(
    "select * from users where email = ?",
    [req.session.email],
    (error, user) => {
      if (error) {
        reject(error);
      }
      res.render("./user/completedOrders", {
        name: req.session.name,
        email: req.session.email,
        orderCompleted: userOrderComplete,
        user: user,
      });
    }
  );
};

const orderCancelled = async (req, res) => {
  const userOrderCancelled = await userOrderService.userOrderCancelled(req);
  con.query(
    "select * from users where email = ?",
    [req.session.email],
    (error, user) => {
      if (error) {
        reject(error);
      }
      res.render("./user/cancelledOrders", {
        name: req.session.name,
        email: req.session.email,
        orderCancelled: userOrderCancelled,
        user: user,
      });
    }
  );
};

module.exports = {
  adminOrders,
  adminShipped,
  adminCompleted,
  adminCancelled,
  orders,
  orderCancelled,
  orderCompleted,
  placeOrder,
  updateOrderToCompleted,
  updateOrderToCancel
};
