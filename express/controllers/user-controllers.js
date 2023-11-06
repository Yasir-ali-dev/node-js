const getAllUsers = (req, res) => {
  res.json("all users");
};

const createUser = (req, res) => {
  res.json("creating user");
};

const getUser = (req, res) => {
  res.json(`getting specific user ${req.params.id}`);
};

const deleteUser = (req, res) => {
  res.json(`deleting specific user ${req.params.id}`);
};

const updateUser = (req, res) => {
  res.json(`update user ${req.params.id}`);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
