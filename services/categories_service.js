const con = require("../database/connection");
const fetchCategory = () => {
  return new Promise((resolve, reject) => {
    con.query("select * from categories order by categories.category_name asc", (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

const addCategory = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "insert into categories values (NULL, ?)",
      [req.body.category],
      (error) => {
        if (error) reject(error);
        resolve({ status: 200, msg: "success" });
      }
    );
  });
};

const editCategory = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from categories where id = ?",
      [req.params.id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ status: 200, category: result });
        }
      }
    );
  });
};

const deleteCategory = (req) => {
  return new Promise((resolve, reject) => {
    con.query("delete from categories where id = ?", [req.body.id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ status: 200, msg: "Category deleted successfully!" });
      }
    });
  });
};

const updateCategory = (req) => {
  return new Promise((resolve, reject) => {
    con.query(
      "update categories set category_name = ? where id = ?",
      [req.body.category, req.body.id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            status: 200,
            msg: "Category updated successfully",
          });
        }
      }
    );
  });
};

module.exports = {
  fetchCategory,
  addCategory,
  deleteCategory,
  editCategory,
  updateCategory,
};
