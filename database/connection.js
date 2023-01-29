const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

con.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("DB Connected");
  }
});

module.exports = con;
