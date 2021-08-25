const fs = require("fs");
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

router.put("/user/", async (req, res, next) => {
  const data = JSON.parse(req.body.user);
  delete data.iat;

  let file;
  if (req.files) file = req.files.image;
  try {
    const user = await User.getUserById(data.id);
    if (!user)
      return res.status(404).send("User with the given ID was not found!");

    if (user.profile_image && req.files) {
      const filePath = `${process.cwd()}/client/public${user.profile_image}`;

      if (filePath) {
        fs.unlink(filePath, (err) => console.log("removing file error: ", err));
      }
      file.mv(`${process.cwd()}/client/public/profile/${file.name}`, (err) => {
        if (err) throw err;
      });

      data.profile_image = `/profile/${file.name}`;
    }

    if (!user.profile_image) {
      file.mv(`${process.cwd()}/client/public/profile/${file.name}`, (err) => {
        if (err) throw err;
      });

      data.profile_image = `/profile/${file.name}`;
    }

    const updated = await User.updateUser(data.id, data);

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
