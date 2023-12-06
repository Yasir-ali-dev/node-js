const { UserList, MovieList, JobList } = require("../data");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    movies: () => {
      return MovieList;
    },
    getFirstUser: () => {
      return UserList[0];
    },
    getSecondUser: () => {
      return UserList[1];
    },
    getFirstMovie: () => {
      return MovieList[0];
    },
    user: (parent, args) => {
      const id = Number(args.id);
      const [user] = UserList.filter((_, index) => _.id === id);
      return user;
    },
    movie: (_, args) => {
      const name = args.name;
      const [movie] = MovieList.filter((_, index) => _.name === name);
      return movie;
    },
    jobs: () => {
      return JobList;
    },
    job: (_, args) => {
      const id = Number(args.id);
      const [job] = JobList.filter((_, index) => _.id === id);
      return job;
    },
  },

  // resolver for other types
  User: {
    favoriteMovie: () => {
      return MovieList.filter(
        (_, index) => _.yearOfPublication >= 2000 && _.yearOfPublication <= 2010
      );
    },
    job: () => {
      return JobList.filter((_) => _.id > 2);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const newId = UserList.length + 1;
      user.id = newId;
      UserList.push(user);
      return user;
    },
    updateUsername: (_, args) => {
      let { id, newUsername } = args.input;
      id = Number(id);
      let newUser;
      UserList.forEach((user) => {
        if (user.id === id) {
          user.username = newUsername;
          newUser = user;
        }
      });
      return newUser;
    },
    deleteUser: (_, args) => {
      const id = Number(args.input.id);
      const [deletedUser] = UserList.filter((_) => _.id === id);
      const updatedUser = UserList.filter((_) => _.id !== id);

      console.log(updatedUser);
      return deletedUser;
    },
  },
};

module.exports = { resolvers };
