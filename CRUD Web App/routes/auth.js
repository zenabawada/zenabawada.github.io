const express = require("express");
const session = require("express-session"); // For saving logged in users in a cookie
const passport = require("passport"); // For handling authentication
const LocalStrategy = require("passport-local"); // For handling username/password based logging in
const crypto = require("crypto"); // Creating our secure passwords

function AuthRouter(database) {
  var router = express.Router();

  // Setting up the cookie session middleware
  router.use(
    session({
      secret: "txYBmm93ejmsjvJZAbnG", // Change this to something very random
      resave: false,
      saveUninitialized: false,
    })
  );
  // Setting up login service to use the cookie middlware
  router.use(passport.authenticate("session"));
  // Setting up a middleware to inject the logged in user into the variables used in our templates
  router.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });
  // Setting up the middleware for verifying that the user logging in exists
  passport.use(
    new LocalStrategy(async function verify(email, password, callback) {
      // Take the username and search the database
      let foundUser = await database.collections.users
        .findOne({ email: email })
        .catch((error) => {
          if (error) {
            callback("Incorrect username or password.", null);
          }
        });
      if (!foundUser) {
        callback("Incorrect username or password.", null);
        return;
      }
      // Recreate the secure password and check it against what is stored in the database
      crypto.pbkdf2(
        password,
        foundUser.salt,
        310000,
        32,
        "sha256",
        function (error, hashedPassword) {
          if (error || !hashedPassword) {
            return;
          }
          if (foundUser.password !== hashedPassword.toString("hex")) {
            return callback("Incorrect username or password.", null);
          } else {
            return callback(null, foundUser);
          }
        }
      );
    })
  );

  // Create the user stored inside the cookie
  passport.serializeUser(function (user, callback) {
    return callback(null, {
      id: user.id,
      username: user.username,
      profileImage: user.profileImage,
    });
  });
  // Retreive the user stored inside the cookie
  passport.deserializeUser(function (user, callback) {
    return callback(null, user);
  });

  router.get("/login", function (req, res) {
    res.render("auth/login", { errorMessage: req.query.errorMessage || null });
  });

  router.get("/register", function (req, res) {
    res.render("auth/register", {
      errorMessage: req.query.errorMessage || null,
    });
  });

  router.get("/registerConfirm", function (req, res) {
    res.render("auth/registerConfirm", {
      errorMessage: req.query.errorMessage || null,
    });
  });

  router.post("/login", (req, res, next) => {
    // Use the username/password authenticate method
    passport.authenticate("local", async (error, user) => {
      if (!user || error) {
        res.redirect(
          "/login?errorMessage=Email and/or password is wrong. Please try again!"
        );
        return;
      }
      await new Promise((resolve, reject) => {
        // If the user is registered and password is correct
        // Then create a cookie for their session
        req.login(
          {
            id: user._id.toString(),
            username: user.fname,
            profileImage: user.profileImage,
          },
          (_) => {
            resolve();
          }
        );
      });
      // Redirect to the main route after login
      res.redirect("/");
    })(req, res, next);
  });

  router.post("/register", async function (req, res) {
    let data = req.body;
    // Create a random amount of data
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await new Promise((resolve, _) => {
      // Create a secure password using that random data and the supplied password
      crypto.pbkdf2(
        data.password,
        salt,
        310000,
        32,
        "sha256",
        (_, hashedPassword) => {
          resolve(hashedPassword);
        }
      );
    });

    const hashedPasswordConfirm = await new Promise((resolve, _) => {
      // Create a secure password using that random data and the supplied password
      crypto.pbkdf2(
        data.password,
        salt,
        310000,
        32,
        "sha256",
        (_, hashedPasswordConfirm) => {
          resolve(hashedPasswordConfirm);
        }
      );
    });

    await database.collections.users.findOne(
      { email: data.email },
      async (error, result) => {
        if (result) {
          res.render("auth/error.ejs", {
            data: data.email,
          });
        } else {
          let user = await database.collections.users.insertOne({
            ...data,
            salt: salt,
            password: hashedPassword.toString("hex"),
            passwordConfirm: hashedPasswordConfirm.toString("hex"),
          });

          await new Promise((resolve, _) => {
            // Log the user in by making a cookie
            req.login(
              {
                id: user.insertedId.toString(),
                username: data.fname,
                profileImage: data.profileImage,
              },
              (_) => {
                resolve();
              }
            );
          });
          // Redirect to the main route
          res.redirect("/");
        }
      }
    );
  });

  router.get("/logout", function (req, res, next) {
    // Delete the cookie
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  return router;
}

module.exports = AuthRouter;

// References:
// https://stackoverflow.com/questions/59652998/how-to-check-if-an-email-is-already-taken-in-mongodb
