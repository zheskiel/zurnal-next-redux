let posts = require("./posts"),
  utilRoutes = require("./utils");

module.exports = [...posts, ...utilRoutes];
