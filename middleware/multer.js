const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"  || file.mimetype == "image/jpg" ) {
      cb(null, true);
    }
    else {
      cb(null, false);
      return cb(new Error('Only .jpeg, .jpg, .png format allowed!'));
    }
  }
});
module.exports = upload;
