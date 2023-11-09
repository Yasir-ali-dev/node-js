const { StatusCodes } = require("http-status-codes");
const { BadRequestError, CustomAPIError, NotFoundError } = require("../errors");
const Shop = require("../model/Shop");

const getAllItems = async (req, res) => {
  try {
    const allItems = await Shop.find({}); //{} no filter fetch all items
    res.status(StatusCodes.OK).json({ success: true, items: allItems });
  } catch (error) {
    throw new CustomAPIError();
  }
};

const createItem = async (req, res) => {
  const { item } = req.body;
  if (!item) {
    throw new BadRequestError("Item is required");
  }
  try {
    const item = await Shop.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, item });
  } catch (error) {
    throw new Error();
  }
};

const getItem = async (req, res) => {
  const id = req.params.id.slice(1);
  if (!id) {
    throw new BadRequestError("please provide the item id");
  }
  const item = await Shop.find({ _id: id });
  if (!item) {
    throw new NotFoundError("item not found");
  }
  res.status(StatusCodes.OK).json({ success: true, item });
};

const updateItem = async (req, res) => {
  const id = req.params.id.slice(1);
  const { item } = req.body;
  if (!id) {
    throw new BadRequestError("please provide the item id");
  }
  if (!item) {
    throw new BadRequestError("please provide the updated item");
  }
  const newItem = await Shop.findByIdAndUpdate(id, req.body, { new: true });
  if (!newItem) {
    throw new NotFoundError("Item not found");
  }
  res.status(StatusCodes.OK).json({ success: true, item: newItem });
  //Cast to ObjectId failed for value
};

const deleteItem = async (req, res) => {
  const id = req.params.id.slice(1);
  if (!id) {
    throw new BadRequestError("please provide the item id");
  }
  const deletedItem = await Shop.findByIdAndDelete({ _id: id }, { new: true });
  if (!deleteItem) {
    throw new NotFoundError("Item not found");
  }
  res.status(StatusCodes.OK).json({ success: true, item: deletedItem });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  getItem,
  updateItem,
};
