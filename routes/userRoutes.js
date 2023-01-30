const express = require("express");
const app = express.Router();
const pageController = require('../controllers/user/pageController');

//end users
app.get("/", pageController.userHome);
app.get("/products", pageController.products);
app.get("/viewProduct/:id", pageController.viewProduct);
app.get("/searchProducts", pageController.searchProductPage);
app.post("/searchProducts", pageController.searchProducts);

module.exports = app;
