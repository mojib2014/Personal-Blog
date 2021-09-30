const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");
const removeProfileImage = require("../middlewares/removeProfileImage");
const moveProfileImage = require("../middlewares/moveProfileImage");

router.get("/user/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.getUserById(user_id);

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

router.put(
  "/user/:user_id",
  [auth, removeProfileImage, moveProfileImage],
  async (req, res, next) => {
    const data = req.body;
    const { user_id } = req.params;
    delete data.iat;
    delete data.user_id;
    try {
      const user = await User.getUserById(user_id);
      if (!user)
        return res.status(404).send("User with the given ID was not found!");

      const updated = await User.updateUser(user.user_id, data);

      res.send(updated);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
