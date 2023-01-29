const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const cookie = require("express-cookie");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authenticationRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const productRoutes = require("./routes/productsRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const cartRoutes = require('./routes/cartRoutes');

// start server
app.listen(3000, () => {
  console.log("Server is listening to port: 3000");
});

// set view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 3600000 },
  })
);
app.use(cookie("secret"));
app.use(flash());

app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(userManagementRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(cartRoutes);
app.use(categoriesRoutes);

// if route not found
app.use((req, res) => {
  res.render("404");
});
