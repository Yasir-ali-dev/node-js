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

app.get("/houses", async (req, res) => {
  const houses = await prisma.house.findMany({
    include: { owner: true, builtBy: true },
  });
  res.json(houses);
});

app.get("/house/:id", async (req, res) => {
  const id = req.params.id.slice(1);
  const house = await prisma.house.findUnique({
    where: { id: id },
    include: { owner: true, builtBy: true },
  });
  res.json(house);
});

app.get("/house", async (req, res) => {
  const { address } = req.body;
  const house = await prisma.house.findUnique({
    where: { address },
  });
  res.json(house);
});

app.get("/houses/filter", async (req, res) => {
  const housesWithFilters = await prisma.house.findMany({
    where: {
      wifiPassword: { not: null },
      owner: {
        age: {
          gte: 10,
        },
      },
      // order by for sorting
    },
    orderBy: [
      {
        builtBy: {
          firstName: "desc",
        },
      },
    ],
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(housesWithFilters);
});

app.listen(4000, () => {
  console.log(`app is listening to the port ` + 4000);
});
