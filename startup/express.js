const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const session = require("express-session");
const config = require("config");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
// const pgSession = require("connect-pg-simple")(session);
const fileupload = require("express-fileupload");
require("./passport_facebook");
require("./passport_google");

const {
  NODE_ENV = "development",

  SESSION_NAME = "sid",
  SESSION_LIFETIME = 1000 * 60 * 60 * 2,
  SESSION_SECRET = config.get("sessionSecret") || "mojib2014",
} = process.env;

const IN_PROD = NODE_ENV === "development";

module.exports = (app, passport) => {
  // Setup static files path
  app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, "public")));
  // View engine
  app.set("view engine", "ejs");
  // req body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cors
  app.use(cors());

  // cookie parser
  app.use(cookieParser());

  // Morgan
  app.use(morgan("dev"));

  // Helmet
  app.use(helmet());

  // session setup
  app.use(
    session({
      name: SESSION_NAME,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
      },
    }),
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // jwtPrivateKey
  require("./config")();

  // File upload
  app.use(fileupload());

  // Routes
  require("./routes")(app);
};
