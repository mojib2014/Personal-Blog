const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  try {
    let user = await User.getUserByEmail(req.body.email);

    if (user) return res.status(400).send("User already registered!");

    const userInstance = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    userInstance.password = await bcrypt.hash(userInstance.password, salt);

    user = await userInstance.register();

    const token = User.generateAuthToken(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.getUserById(id);

    if (!user)
      return res.status(404).send("A User with the given ID was not found!");

    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.getUserByEmail(email);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/user/posts/:user_id", async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const userPosts = await User.getUserPosts(user_id);

    res.send(userPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
