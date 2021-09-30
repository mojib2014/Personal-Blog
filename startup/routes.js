"use strict";
const auth = require("../routes/auth");
const googleAuth = require("../routes/auth_google");
const facebookAuth = require("../routes/auth_facebook");
const users = require("../routes/users");
const posts = require("../routes/posts");
const tags = require("../routes/tags");
const comments = require("../routes/comments");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/auth/facebook", facebookAuth);
  app.use("/api/auth/google", googleAuth);
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/tags", tags);
  app.use("/api/comments", comments);
};
