const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

// login form
router.get("/login", (req, res) => {
  res.render("loginForm", { user: req.user });
});

// Auth with google
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback route for google to  redirect to
router.get(
  "/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(req.user);
  },
);

// logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    res.clearCookie("sid");
    res.redirect("/login");
  });
});

module.exports = router;
