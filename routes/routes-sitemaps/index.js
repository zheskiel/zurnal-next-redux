let posts = require("./posts"),
  lyrics = require("./lyrics"),
  chords = require("./chords"),
  utilRoutes = require("./utils");

module.exports = [...posts, ...lyrics, ...chords, ...utilRoutes];
