const { StatusCodes } = require("http-status-codes");

const getAllItems = (req, res) => {
  res.send("all items");
};

const createItem = (req, res) => {
  res.send("creating item");
};

const getItem = (req, res) => {
  res.send("getting an item");
};

const updateItem = (req, res) => {
  res.send("updating an item");
};

const deleteItem = (req, res) => {
  res.send("deleting an item");
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  getItem,
  updateItem,
};
