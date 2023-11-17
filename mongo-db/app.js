require("dotenv").config();
const express = require("express");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");
const uploadRouter = require("./routes/route");
const app = express();
const path = require("path");

app.set("view engine", "ejs");

app.use("/upload", uploadRouter);
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
  const query = await Tank.findById(
    { _id: "65547e3f8ebb74011000b56a" },
    "size"
  );
  console.log(query);
};
// querying();

const findTank = async () => {
  const query = await Tank.findOne({ name: "E-large" }, "name");
  console.log(query);
};
// findTank();

const deleting = async () => {
  const query = await Tank.deleteOne({ size: { $gte: 17 } });
  console.log(query, query.acknowledged, query.deletedCount);
};
// deleting();

const deleteById = async () => {
  const query = await Tank.findByIdAndDelete("65547e3f8ebb74011000b56a");
  console.log(query);
};
// deleteById();

const updating = async () => {
  const query = await Tank.updateOne({ size: 5 }, { size: 17, name: "TZ-1" });
  console.log(query);
};

// updating();

const findReplace = async () => {
  const query = await Tank.replaceOne(
    { name: "TZ-1" },
    { size: 17, name: "TZ-1" }
  );
  console.log(query);
};
// findReplace();

const updateById = async () => {
  const query = await Tank.findByIdAndUpdate(
    "65547762420723aa1f7e967b",
    {
      size: 17,
      name: "Ex-Large",
    },
    { new: true }
  );
  console.log(query);
};
// updateById();

//----------------------------- documents --------------------
const doc = new Tank();
console.log(
  doc instanceof Tank,
  doc instanceof mongoose.Model,
  doc instanceof mongoose.Document
);
const updatingDocument = async () => {
  doc.name = "TZ-10";
  doc.size = 3;
  await doc.save();
};
// updatingDocument();

const validateDocument = async () => {
  const x_small = new Tank({ name: 1, size: "2" });
  const obj = await x_small.validate();
  console.log(x_small);
};
// validateDocument();

const overwriteDocument = async () => {
  //   const small = await Tank.findOne({ _id: "65547762420723aa1f7e967a" });
  //   small.overwrite({ name: "TZ-111" });
  //   const over = await small.save();
  //   console.log(over);
  await Tank.replaceOne({ _id: "65547762420723aa1f7e967a" }, { size: 111 });
};
// overwriteDocument

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
