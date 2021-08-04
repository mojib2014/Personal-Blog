const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");
const User = require("../models/user");

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
