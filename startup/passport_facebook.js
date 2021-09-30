const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("config");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.getUserByFacebookId(id);
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebookAppId"),
      clientSecret: config.get("facebookAppSecret"),
      callbackURL: "/api/auth/facebook/redirect",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Interact with db
      try {
        let user = await User.getUserByFacebookId(profile.id);
        if (user) return done(null, user);

        const res = profile._json;
        const name = res.name.split(" ");
        const data = {
          first_name: name[0],
          last_name: name[1],
          email: res.email,
          profile_image: res.picture.data.url,
          cover_image: res.picture.data.url,
          facebook_id: res.id,
        };

        user = new User(data);

        await user.register();
        const createdUser = await User.getUserByFacebookId(user.facebook_id);

        return done(null, createdUser);
      } catch (err) {
        console.log("google callback error: ", err);
        done(err, null);
      }
    },
  ),
);
