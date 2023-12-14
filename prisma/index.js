const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id.slice(1));
  const newUser = await prisma.user.update({
    where: { id: id },
    data: req.body,
  });
  res.json(newUser);
});

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id.slice(1));
  const newUser = await prisma.user.delete({
    where: { id: id },
  });
  res.json(newUser);
});

app.listen(4000, () => {
  console.log(`app is listening to the port ` + 4000);
});
