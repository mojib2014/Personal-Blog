const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
