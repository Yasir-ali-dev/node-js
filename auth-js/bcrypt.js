const bcrypt = require("bcrypt");
const password = "secret";
const saltRound = 10;

const hashed = bcrypt
  .hash(password, saltRound)
  .then((hashedPassord) => {
    // console.log("hashed ", hashedPassord);
    return hashedPassord;
  })
  .then((hash) => {
    return bcrypt.compare(password, hash);
  })
  .then((res) => {
    // console.log(res);
  });

const getEncrypted = async (password, saltRound) => {
  return await bcrypt.hash(password, saltRound).then((hashed) => hashed);
};
const encrypted = getEncrypted("secrets", 11);
console.log(encrypted);
