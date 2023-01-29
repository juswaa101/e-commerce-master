const express = require('express');
const app = express.Router();
const register = require("../controllers/user/registerController");
const cartController = require("../controllers/user/cartController");

app.get("/cart/:id", register.hasAuth, cartController.fetchCart);
app.post("/addCart", register.hasAuth, cartController.addCart);
app.post("/deleteCart", register.hasAuth, cartController.deleteCart);
app.get("/cartNotification/:id", register.hasAuth, cartController.fetchNotification);

module.exports = app;