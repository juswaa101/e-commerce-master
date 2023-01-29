const cartService = require("../../services/cart_service");
const con = require('../../database/connection');

const fetchCart = async (req, res) => {
  const fetchCart = await cartService.fetchCart(req);
  con.query(
    "select * from users where email = ?",
    [req.session.email],
    (error, user) => {
      if (error) {
        reject(error);
      }
      res.render("./user/cart", {
        cart: fetchCart,
        name: req.session.name,
        email: req.session.email,
        user: user,
      });
    }
  );
};

const addCart = async (req, res) => {
  const addCart = await cartService.addCart(req);
  res.json(addCart);
};

const deleteCart = async (req, res) => {
  const deleteCart = await cartService.deleteCart(req);
  res.json(deleteCart);
};

const fetchNotification = async (req, res) => {
  const fetchNotification = await cartService.fetchNotification(req);
  res.json(fetchNotification);
}

module.exports = {
  fetchCart,
  addCart,
  deleteCart,
  fetchNotification
};
