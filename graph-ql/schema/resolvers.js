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
  },
  User: {
    job: () => {
      return JobList.filter((_) => _.id > 2);
    },
  },
};

module.exports = { resolvers };
