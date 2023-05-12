const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
//needed for the user to stay connected
app.use(passport.session());


app.get('/', function(req, res) {
    res.redirect('/home');
  });

  app.get('/home', function(req, res) {
    const html = `
      <html>
        <head>
          <title>My charts</title>
        </head>
        <body>
          <h1>My charts</h1>
          <a href="/auth/google"><button>Connect with Google</button></a>
        </body>
      </html>
    `;
    res.send(html);
  });
  
  

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  connection.query('SELECT * FROM users WHERE email = ?', [req.user.email], function(err, results, fields) {
    if (err) {
      return done(err);
    }
    if (results.length === 0) {
      res.redirect('/confirm');
    } else {
      res.redirect('/success');
    }
  });
});

app.get('/create', async function(req, res) {
  try {
    if (!req.user) {
      res.redirect('/auth/google');
      return;
    }

    
    const results1 = await connection.query('SELECT * FROM users WHERE email = ?', [req.user.email]);
    if (results1.length > 0) {
      console.log("User already exists:", email);
      const user = results1[0];
      req.login(user, function(err) {
        if (err) {
          console.error("Error logging in user:", err);
          res.status(500).send("Error logging in user");
        } else {
          console.log("User logged in:", user);
          res.redirect('/success');
        }
      });
      return;
    }
    
    console.log("Create account called");
    const user = {
      email: req.user.email,
      credit: 9
    };
    


    const result = await connection.query('INSERT INTO users SET ?', user);
    user.id = result.insertId;
    user.id = result.insertId;
    
  
    await new Promise((resolve, reject) => {
      req.login(user, function(err) {
        if (err) {
          console.error("Error logging in user:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  
    console.log("User logged in:", user);
    res.redirect('/success');
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Error creating user");
  }
});


app.get('/cancel', function(req, res) {
  connection.query('DELETE FROM users WHERE email = ?', [req.user.email]);
  req.session.destroy(function(err) {
    if (err) {
      console.error("Error destroying session:", err);
      return done(err);
    }
    res.redirect('/');
  });
});





app.get('/success', function(req, res) {
  if (req.user) {
    res.send('Welcome , you have ' + req.user.credit + ' credits left.');
  } else {
    res.redirect('/auth/google');
  }
});

app.get('/confirm', function(req, res) {
  const html = `
    <html>
      <head>
        <title>Confirm Account</title>
      </head>
      <body>
        <h1>Do you want to create an account?</h1>
        <p>You don't have an account with us yet. Would you like to create one with 9 credits?</p>
        <button onclick="location.href='/create'">Create Account</button>
        <button onclick="location.href='/cancel'">Cancel</button>
      </body>
    </html>
  `;
  res.send(html);
});









app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
