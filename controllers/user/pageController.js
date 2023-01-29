const con = require("../../database/connection");

const userHome = (req, res) => {
  con.query(
    "select * from products where is_featured = 1",
    (error, featured) => {
      if (error) {
        console.log(error);
      }
      con.query(
        "select * from users where email = ?",
        [req.session.email],
        (error, user) => {
          if (error) {
            reject(error);
          }
          res.render("./user/home", {
            name: req.session.name,
            email: req.session.email,
            products: featured,
            user: user,
          });
        }
      );
    }
  );
};

const viewProduct = (req, res) => {
  con.query(
    "select *, products.id as pid from products INNER JOIN categories ON products.category_id = categories.id where products.id = ?",
    [req.params.id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        con.query(
          "select * from users where email = ?",
          [req.session.email],
          (error, user) => {
            if (error) {
              reject(error);
            }
            res.render("./user/viewProduct", {
              name: req.session.name,
              email: req.session.email,
              product: result,
              user: user,
            });
          }
        );
      }
    }
  );
};

const products = (req, res) => {
  con.query(
    "select *, products.id as pid from products INNER JOIN categories ON products.category_id = categories.id order by categories.category_name asc",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        con.query(
          "select * from users where email = ?",
          [req.session.email],
          (error, user) => {
            if (error) {
              reject(error);
            }
            res.render("./user/products", {
              name: req.session.name,
              email: req.session.email,
              products: result,
              user: user,
            });
          }
        );
      }
    }
  );
};

module.exports = {
  userHome,
  viewProduct,
  products,
};
