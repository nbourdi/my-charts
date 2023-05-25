const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connection = require('./db');

passport.use(new GoogleStrategy({
    clientID: '100104718200-esp9hr1ti2hudrtekmrsfe83peg6sapc.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000',
    scope: ['profile', 'email'],
  }, 

  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
  )
  );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;