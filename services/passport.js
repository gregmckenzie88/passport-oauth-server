const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // check db for existing user
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
      // might need proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user exists
      try {
        User.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
            // user already exists
            done(null, existingUser);
          } else {
            // save new user
            new User({
              googleId: profile.id
            })
              .save()
              .then(user => done(null, user));
          }
        });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback"
      // might need proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("facebook", profile);

      try {
        User.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
            // user already exists
            done(null, existingUser);
          } else {
            // save new user
            new User({
              googleId: profile.id
            })
              .save()
              .then(user => done(null, user));
          }
        });
      } catch (err) {
        done(err, null);
      }
    }
  )
);
