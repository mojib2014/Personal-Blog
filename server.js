const express = require("express");
const passport = require("passport");

const app = express();

require("./startup/express")(app, passport);

// app.use(require("./middlewares/error"));
module.exports = app;
