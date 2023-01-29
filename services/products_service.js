const con = require("../database/connection");
const fs = require("fs");
const path = require("path");
let imgPath = path.join(__dirname, "..", "public", "images");

const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    con.query(
      "select *, products.id as pid from products INNER JOIN categories ON products.category_id = categories.id order by categories.category_name asc",
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const addProducts = (req) => {
  return new Promise((resolve, reject) => {
    $product = req.body.product;
    $desc = req.body.desc;
    $price = req.body.price;
    $category = req.body.category;
    $img = req.file.filename;
    $qty = req.body.qty;
    con.query(
      "insert into products values(NULL, ?, ?, ?, ?, ?, ?, 0)",
      [$product, $desc, $category, $img, $price, $qty],
      (error) => {
        if (error) {
          reject(error);
        }
        resolve({ status: 200, msg: "success" });
      }
    );
  });
};

const editProduct = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select *, products.id as pid from products INNER JOIN categories ON products.category_id = categories.id where products.id = ?",
      [req.params.id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ status: 200, product: result });
        }
      }
    );
  });
};

const updateProduct = (req) => {
  return new Promise((resolve, reject) => {
    if (req.file.length != 0) {
      getImage(req.body.id)
        .then((result) => {
          result.forEach((e) => {
            if (fs.existsSync(imgPath + "/" + e.img)) {
              fs.unlink(imgPath + "/" + e.img, (err) => {
                if (err) reject(err);
                con.query(
                  "update products set item_name = ?, description = ?, category_id = ?, img = ?, price = ?, qty = ?, is_featured = ? where id = ?",
                  [
                    req.body.product,
                    req.body.desc,
                    req.body.category,
                    req.file.filename,
                    req.body.price,
                    req.body.qty,
                    req.body.featured,
                    req.body.id,
                  ],
                  (error) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve({
                        status: 200,
                        msg: "Product updated successfully",
                      });
                    }
                  }
                );
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      con.query(
        "update products set item_name = ?, description = ?, price = ?, qty = ? where id = ?",
        [
          req.body.product,
          req.body.desc,
          req.body.price,
          req.body.qty,
          req.body.id,
        ],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({ status: 200, msg: "Product updated successfully" });
          }
        }
      );
    }
  });
};

const deleteProduct = (req) => {
  return new Promise((resolve, reject) => {
    con.query("delete from products where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ status: 200, msg: "Product deleted successfully!" });
      }
    });
  });
};

const getImage = (id) => {
  return new Promise((resolve, reject) => {
    con.query("select * from products where id = ?", [id], (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  fetchProducts,
  addProducts,
  editProduct,
  updateProduct,
  deleteProduct,
};
