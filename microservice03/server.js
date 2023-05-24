const express = require('express');
const cookieSession = require("cookie-session");
const session = require('express-session');
const passport = require('./auth');
const connection = require('./db');
const cors = require("cors");
const app = express();
const port = 3000;

const CLIENT_URL = "http://localhost:3030";
const CLIENT_URL_CREATE = "http://localhost:3030/create";
const SUCCESS_URL = "http://localhost:3030/signup/success";
const CONFIRM_URL = "http://localhost:3030/signup/confirm";


app.use(
  cookieSession({ name: "session", keys: ["openreplay"], maxAge: 24 * 60 * 60 * 100, })
);

app.use(passport.initialize());
//needed for the user to stay connected
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:3030"],
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

app.get("/userinfo", async function (req, res) {
  if (req.user) {
    console.log(req.user.emails[0].value);

    connection.query('SELECT * FROM users WHERE email = ?', [req.user.emails[0].value], function (err, results) {
      if (err) {
        // Handle the error
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        const credit = user.credit;
        const lastLogin = user.lastlogin;

        // Use the retrieved values as needed
        console.log('Credit:', credit);
        console.log('Last Login:', lastLogin);

        res.status(200).json({
          user: {
            name: req.user.displayName,
            // lastlogin: lastLogin,
            credits: credit
          }
        });
      } else {
        // User not found
        console.log('User not found');
        res.status(404).json({ error: 'User not found' });
      }
    });
  }
});


app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get('/logout', (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  console.log(req.user);

  // Prepare the SQL query
  const query = 'UPDATE users SET lastlogin = ? WHERE email = ?';
  const values = [formattedDate, req.user.emails[0].value]; // Include the formatted date and user email as values

  // Execute the query
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating last login:', error);
      // Handle the error appropriately
    } else {
      console.log('Last login updated successfully!');
      // Handle the success appropriately
    }
  });
  req.logout();
  res.redirect(CLIENT_URL);
});
// app.get('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     // res.redirect('/');
//   });
//   req.logout();
//   res.redirect(CLIENT_URL);
// });



app.get("/auth/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

app.get(
  "/",
  passport.authenticate("google", {
    // successRedirect: CLIENT_URL_CREATE,
    failureRedirect: "/login/failed",
  }), function (req, res) {
    connection.query('SELECT * FROM users WHERE email = ?', [req.user.emails[0].value], function (err, results, fields) {
      if (err) {
        return done(err);
      }
      if (results.length === 0) {
        console.log("should be redirecting to confirm_url on client")
        res.redirect(CONFIRM_URL); // TODO
      } else {
        res.redirect(SUCCESS_URL); // TODO
      }
    });
  });
app.get('/create', async function (req, res) {
  try {
    if (!req.user) {
      res.redirect('/auth/google');
      return;
    }
    const results1 = await connection.query('SELECT * FROM users WHERE email = ?', [req.user.emails[0].value]);
    if (results1.length > 0) {
      console.log("User already exists in mycharts db:", req.user.emails[0].value);
      return;
    }

    console.log("Create account called");
    const user_db = {
      email: req.user.emails[0].value,
      credit: 9
    };
    const result = await connection.query('INSERT INTO users SET ?', user_db);
    user_db.id = result.insertId;
    user_db.id = result.insertId;

    console.log("User logged in:", user_db);
    //res.redirect(SUCCESS_URL);
    res.status(200);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Error creating user");
  }
});


app.get('/cancel', function (req, res) {
  connection.query('DELETE FROM users WHERE email = ?', [req.user.emails[0].value]);
  res.redirect('/logout');
});

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
