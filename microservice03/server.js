
const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const connection = require('./db');
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;

const CLIENT_URL = "http://localhost:3030";
const CLIENT_URL_CREATE = "http://localhost:3030/create";


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
//needed for the user to stay connected
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:3030", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL_CREATE,
    failureRedirect: "/login/failed",
  })
);


app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
