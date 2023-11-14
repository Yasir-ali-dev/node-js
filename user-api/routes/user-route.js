const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  authenticateUser,
} = require("../controllers/user-controller");
router.route("/").get(getAllUsers).post(createUser);
router.route("/login").post(authenticateUser);
module.exports = router;
