const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

module.exports = app => {
  app.use(helmet());
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // set max age of cookie to 30 days
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
