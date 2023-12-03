const { UserList } = require("../data");
const resolvers = {
  Query: {
    users() {
      return UserList;
    },
  },
};

module.exports = { resolvers };
