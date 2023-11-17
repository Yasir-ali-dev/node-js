const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fileSystem = require("fs");

router.route("/").get((req, res) => {
  res.render("../view/index");
});
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("please upload an valid image file"));
    }
    callback(null, true);
  },
});

router.route("/").post(upload.single("profile"), (req, res) => {
  // have access to the req.file that is uploaded
  res.json({ msg: "uploaded", img: path.resolve(req.file.filename) });
});

module.exports = router;
