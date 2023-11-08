const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controllers");
const router = express.Router();



router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
