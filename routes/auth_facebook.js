const router = require("express").Router();
const passport = require("passport");

// login form
router.get("/login", (req, res) => {
  res.render("loginForm", { user: req.user });
});

// login
router.get("/", passport.authenticate("facebook"));

// callback route for google to redirect to
router.get("/redirect", passport.authenticate("facebook"), (req, res) => {
  res.send(req.user);
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
