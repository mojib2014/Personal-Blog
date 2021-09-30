const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");
const User = require("../models/user");

router.post("/signup", async (req, res, next) => {
  try {
    let user = await User.getUserByEmail(req.body.email);

    if (user)
      return res.status(400).send("User already registered, Please login!");

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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    if (!user) return res.status(400).send("Invalid email or password!");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).send("Invalid email or password.");

    user.last_login = moment.utc().toISOString();

    const token = User.generateAuthToken(user);

    res.send(token);
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
});

module.exports = router;
