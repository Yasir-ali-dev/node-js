require("dotenv").config();
const express = require("express");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());
const authorSchema = new mongoose.Schema({
  name: String,
});
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", // Reference to the Author model
  },
});

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  // every owner should have an array called pets
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});
const petSchema = new mongoose.Schema({
  name: String,
  // let's create a reference to the owner model
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    // the type is going to be just an id
    // but it will refer to the Owner model
    // (the first parameter to the mongoose.model method)
    ref: "Owner",
  },
});

const Owner = mongoose.model("Owner", ownerSchema);
const Pet = mongoose.model("Pet", petSchema);

const Author = mongoose.model("Author", authorSchema);
const Post = mongoose.model("Post", postSchema);

app.post("/owners", async (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide name " });
  }
  const newOwner = await Owner.create({ name: req.body.name });
  res.status(201).json({
    message: `new author created ${newOwner._id}`,
    owner: newOwner,
  });
});
app.post("/owners/:ownerId/pet", async (req, res) => {
  console.log(req.params);
  const ownerId = req.params.ownerId.slice(1);
  if (!req.body.name || !ownerId) {
    res.status(400).json({ message: "Please provide name " });
  }
  const owner = await Owner.findById(ownerId);
  const pet = await Pet.create({ name: req.body.name, owner: owner._id });
  await owner.pets.push(pet._id);
  await owner.save();
  res.status(201).json({
    message: `new pet created ${pet._id}`,
    pet: pet,
  });
});

app.post("/author", async (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide name " });
  }
  const newAuthor = await Author.create({ name: req.body.name });
  res.status(201).json({
    message: `new author created ${newAuthor._id}`,
    author: newAuthor,
  });
});

app.post("/post", async (req, res) => {
  const { title, content, authorId } = req.body;
  if (!req.body.authorId) {
    res.status(400).json({ message: "Please provide author " });
  }
  const author = await Author.findById(authorId);

  const post = await Post.create({
    title,
    content,
    author: author._id,
  });
  res.status(201).json({
    message: `new post created ${post._id}`,
    post: post,
  });
});

const port = process.env.PORT;
const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

start();
