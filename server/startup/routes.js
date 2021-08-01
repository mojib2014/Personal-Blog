"use strict";
const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const posts = require("../routes/posts");
const comments = require("../routes/comments");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/comments", comments);
};
