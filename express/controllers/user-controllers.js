let users = [
  { name: "Yasir Ali", id: 100 },
  { name: "Hussain", id: 101 },
  { name: "Abrar Ali", id: 102 },
];
let id = 1;

const getAllUsers = (req, res) => {
  res.status(200).json({ users: users });
};

const createUser = (req, res) => {
  if (!req.body.name) {
    res.status(401).json({ message: "please provide user name" });
  }
  const user = {
    name: req.body.name,
    id: id++,
  };
  users.push(user);
  console.log(users);
  res.status(201).json({ message: `user created successfully ${user}` });
};

const getUser = (req, res) => {
  const id = req.params.id.slice(1);

  const specificUser = users.find((user) => {
    if (user.id === Number(id)) {
      return user;
    }
  });
  if (!specificUser) {
    res
      .status(404)
      .json({ success: false, message: "bad request user not found" });
  }
  res.status(200).json({ success: true, user: specificUser });
};

const deleteUser = (req, res) => {
  const id = req.params.id.slice(1);
  const updatedUsers = users.filter((user) => user.id !== Number(id));
  const deletedUser = users.filter((user) => user.id === Number(id));
  if (deletedUser.length < 1) {
    res.status(404).json({ success: false, message: "user not found" });
  }
  users = [...updatedUsers];
  res.status(200).json({ success: true, users: users });
};

const updateUser = (req, res) => {
  const id = req.params.id.slice(1);
  const specificUser = users.find((user) => user.id === Number(id));

  if (!req.body.name) {
    res
      .status(401)
      .json({ success: false, message: "please provide updated value" });
  }

  if (!specificUser) {
    res
      .status(404)
      .json({ success: false, message: "user not found to update" });
  }

  const newUsers = users.map((user) => {
    if (user.id === Number(id)) {
      const obj = {
        ...user,
        name: req.body.name,
      };
      return obj;
    }
    return user;
  });

  users = [...newUsers];
  res.json({ success: true, users: users });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
