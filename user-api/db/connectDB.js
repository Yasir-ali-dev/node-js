const { default: mongoose } = require("mongoose");

const connectDB = (URI) => {
  mongoose
    .connect(URI)
    .then()
    .catch((err) => console.log(`Error in connection ${err}`));
};
module.exports = connectDB;
