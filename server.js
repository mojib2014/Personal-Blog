const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileupload = require("express-fileupload");

const app = express();

require("./startup/cors")(app);
require("./startup/helmet")(app);
app.use(fileupload());
require("./startup/routes")(app);
require("./startup/config")();
app.use(logger("dev"));
require("./startup/bodyParser")(app);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./middlewares/error"));

module.exports = app;
