const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: { houseBuilt: true, houseOwned: true },
  });
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id.slice(1);
  const newUser = await prisma.user.update({
    where: { id: id },
    data: req.body,
  });
  res.json(newUser);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id.slice(1);
  const newUser = await prisma.user.delete({
    where: { id: id },
  });
  res.json(newUser);
});

app.post("/house", async (req, res) => {
  const newHouse = await prisma.house.create({ data: req.body });
  res.json(newHouse);
});

app.get("/house", async (req, res) => {
  const houses = await prisma.house.findMany({
    include: { owner: true, builtBy: true },
  });
  res.json(houses);
});

app.listen(4000, () => {
  console.log(`app is listening to the port ` + 4000);
});
