const express = require("express");
const app = express.Router();
const pageController = require('../controllers/user/pageController');

//end users
app.get("/", pageController.userHome);
app.get("/products", pageController.products);
app.get("/viewProduct/:id", pageController.viewProduct);

module.exports = app;
