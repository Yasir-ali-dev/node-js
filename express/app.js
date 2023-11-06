const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const userRouter = require("./routes/user-routes");

app.use(express.json());
app.use(bodyParser.json());
app.use("/users", userRouter);

const port = 7000;
app.listen(port, () => {
  console.log(`app is listening to the port ${port}`);
});
