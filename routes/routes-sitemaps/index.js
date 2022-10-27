let posts = require("./posts"),
  lyrics = require("./lyrics"),
  utilRoutes = require("./utils");

module.exports = [...posts, ...lyrics, ...utilRoutes];
