const express = require("express");
const router = express.Router();
const {
  getAllItems,
  createItem,
  deleteItem,
  updateItem,
  getItem,
} = require("../controllers/shop-controller");

router.route("/").get(getAllItems).post(createItem);
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);
module.exports = router;
