const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connection = require('./db');

passport.use(new GoogleStrategy({
    clientID: '100104718200-esp9hr1ti2hudrtekmrsfe83peg6sapc.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000',
    proxy: true
  }, 
  function(accessToken, refreshToken, profile, done) {
    connection.query('SELECT * FROM users WHERE email = ?', [profile.emails[0].value], function(err, results, fields) {
      if (err) {
        return done(err);
      }
      if (results.length === 0) {
        const user = {
          email: profile.emails[0].value,
          createAccount: true
        };
        return done(null, user);
      } else {
        const user = results[0];
        if (user.credit) {
          return done(null, user);
        } else {
          user.createAccount = true;
          return done(null, user);
        }
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (user.createAccount) {
    connection.query('SELECT * FROM users WHERE email = ?', [user.email], function(err, results, fields) {
      if (err) {
        return done(err);
      }
      if (results.length > 0) {
        // User already exists, return existing user
        return done(null, results[0]);
      } else {
        // User does not exist, insert new user into database
        const newUser = {
          email: user.email,
          credit: 9
        };
          return done(null, newUser);

      }
    });
  } else {
    connection.query('SELECT * FROM users WHERE id = ?', [user.id], function(err, results, fields) {
      if (err) {
        return done(err);
      }
      const user = results[0];
      if (user && user.credit) {
        done(null, user);
      } else {
        done(null, null);
      }
    });
  }
});

module.exports = passport;