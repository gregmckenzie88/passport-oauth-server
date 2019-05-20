const passport = require("passport");

module.exports = app => {
  // google routes
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:9001",
      failureRedirect: "/failure"
    })
  );

  // facebook routes
  app.get(
    "/api/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "http://localhost:9001",
      failureRedirect: "/failure"
    })
  );

  // logout current user
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:9001/");
    // res.send(req.user);
  });

  // check current user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
