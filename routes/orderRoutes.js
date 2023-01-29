const express = require('express');
const app = express.Router();
const registerController = require('../controllers/user/registerController');
const orderControllers = require('../controllers/admin/ordersController');

app.get("/adminOrders",registerController.hasAuth ,orderControllers.adminOrders);
app.get("/adminShipped", registerController.hasAuth,orderControllers.adminShipped);
app.get("/adminCompleted", registerController.hasAuth,orderControllers.adminCompleted);
app.get("/adminCancelled", registerController.hasAuth,orderControllers.adminCancelled);

app.get("/orders", registerController.hasAuth , orderControllers.orders);
app.post("/placeOrder", registerController.hasAuth, orderControllers.placeOrder);
app.get("/completedOrders", registerController.hasAuth, orderControllers.orderCompleted);
app.post("/orderCompleted", registerController.hasAuth, orderControllers.updateOrderToCompleted);
app.get("/cancelledOrders", registerController.hasAuth, orderControllers.orderCancelled);
app.post("/orderCancel", registerController.hasAuth, orderControllers.updateOrderToCancel);
module.exports = app;