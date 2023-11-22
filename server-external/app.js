const express = require("express");
const app = express();
const redisClient = require("redis").createClient({
  host: "127.0.0.1",
  port: 6379,
});
app.set("view engine", "pug");
// notice here we are telling express to render views using the pug templating engine.
const colors = ["red", "green", "blue"];

const connectRedis = async () => {
  redisClient.on("connect", () =>
    console.log("Redis is connected `127.0.0.1`")
  );
  redisClient.on("error", (err) => console.log("Redis client error", err));
  await redisClient.connect();
};
connectRedis();

redisClient.set("name", "Kalia");
async function getValue(key) {
  const name = await redisClient.get(key);
  console.log(name);
}
getValue("name");

app.get("/", (request, response) => {
  const firstName = "Ellie";
  return response.render("index", { name: firstName }); // here we are rendering a template called index.pug inside of the views folder
});

app.get("/colors", (request, response) => {
  // {colors} is ES2015 object shorthand notation for {colors: colors}
  return response.render("data", { colors });
});

app.listen(4000, () => {
  console.log("The server has started on port 4000");
});
