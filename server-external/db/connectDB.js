const { default: mongoose } = require("mongoose");

const connecDB = (URI) => {
  mongoose
    .connect(URI)
    .then()
    .catch((err) => console.log(err));
};
module.exports = connecDB;
