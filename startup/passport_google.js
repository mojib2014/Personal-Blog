"use strict";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("config");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  console.log("serialize: ", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.getUserByGoogleId(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // TODO: interact with db
      console.log(profile);
      try {
        let user = await User.getUserByGoogleId(profile.id);
        if (user) return done(null, user);
        const res = profile._json;
        const data = {
          email: res.email,
          first_name: res.given_name,
          last_name: res.family_name,
          profile_image: res.picture,
          cover_image: res.picture,
          google_id: res.sub,
        };

        user = new User(data);

        await user.register();
        const createdUser = await User.getUserByGoogleId(user.google_id);

        return done(null, createdUser);
      } catch (err) {
        console.log("google callback error: ", err);
        done(err, null);
      }
    },
  ),
);
