require("dotenv").config();
const express = require("express");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");

const app = express();

// mongoose schema
const tankSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
});
const Tank = mongoose.model("tanks", tankSchema);
async function creatingTank(object) {
  /*  
  // using constructor method
  const small = new Tank(object);
  await small.save();
  */
  // using create method
  await Tank.create(object);

  // for inserting large batches of document
}
// creatingTank({ size: 10, name: "large" });

async function CreateManyDocuments(arrOfDocument) {
  await Tank.insertMany(arrOfDocument);
}
// CreateManyDocuments([
//   { size: 13, name: "small" },
//   { size: 15, name: "E-large" },
//   { size: 17, name: "medium " },
// ]);

const querying = async () => {
  //   const query = await Tank.findOne({ size: 10 });
  const query = await Tank.findById({ _id: "6554762d0b241e0751e5b182" });
  console.log(query);
};
// querying();

const deleting = async () => {
  const query = await Tank.deleteMany({ name: "small" });
  console.log(query, query.acknowledged, query.deletedCount);
};
// deleting();

const updating = async () => {
  const query = await Tank.updateOne({ size: 5 }, { size: 17, name: "TZ-1" });
  console.log(query);
};
updating();

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
    logError(err);
  });
};

start();
