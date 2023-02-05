const DatabaseService = require("../database/database.js");
const express = require("express");
const helpers = require("../helpers/auth.js");
const crypto = require("crypto"); // Creating our secure passwords

function UsersRouter(database) {
  var router = express.Router();

  router.get("/user/:id", helpers.isAuthenticated, async (req, res) => {
    let user = await database.collections.users.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    let userId = req.params.id;

    let query = { userId: userId };
    let posts = await database.collections.posts
      .find(query, {})
      .sort({ date: -1 })
      .toArray();

    res.render("user/profile.ejs", {
      userId: userId,
      profileUser: user,
      posts: posts,
    });
  });

  router.get("/editUser/:id", helpers.isAuthenticated, async (req, res) => {
    let user = await database.collections.users.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    let userId = req.params.id;
    res.render("user/editUser.ejs", { user: user, userId: userId });
  });

  router.get("/editEmail/:id", helpers.isAuthenticated, async (req, res) => {
    let user = await database.collections.users.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    let userId = req.params.id;

    res.render("user/editEmail.ejs", { user: user, userId: userId });
  });

  router.get("/editPassword/:id", helpers.isAuthenticated, async (req, res) => {
    let user = await database.collections.users.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    let userId = req.params.id;

    res.render("user/editPassword.ejs", { user: user, userId: userId });
  });

  router.post("/editUser/:id", helpers.isAuthenticated, async (req, res) => {
    let data = req.body;
    // Create a random amount of data

    let user = req.user;
    let userId = req.params.id;
    const filter = { _id: new DatabaseService.ObjectId(user.id) };
    const updateDoc = {
      $set: {
        ...data,
      },
    };
    await database.collections.users.updateOne(filter, updateDoc);

    let postFilter = { userId: userId };
    // let posts = await database.collections.posts.find(query, {}).toArray();

    let updatePost = {
      $set: {
        username: data.fname,
        userImage: data.profileImage,
      },
    };
    res.locals.user = req.user;
    req.user.username = data.fname;
    await database.collections.posts.updateMany(postFilter, updatePost);

    res.redirect(`/user/${userId}`);
  });

  router.post("/editEmail/:id", helpers.isAuthenticated, async (req, res) => {
    let data = req.body;
    // Create a random amount of data

    let user = req.user;
    let userId = req.params.id;
    const filter = { _id: new DatabaseService.ObjectId(user.id) };
    const updateDoc = {
      $set: {
        ...data,
      },
    };
    await database.collections.users.updateOne(filter, updateDoc);

    res.locals.user = req.user;
    req.user.username = data.fname;

    res.redirect(`/editUser/${userId}`);
  });

  router.post(
    "/editPassword/:id",
    helpers.isAuthenticated,
    async (req, res) => {
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
      let user = req.user;
      let userId = req.params.id;
      const filter = { _id: new DatabaseService.ObjectId(user.id) };
      const updateDoc = {
        $set: {
          ...data,
          salt: salt,
          password: hashedPassword.toString("hex"),
          passwordConfirm: hashedPasswordConfirm.toString("hex"),
        },
      };
      await database.collections.users.updateOne(filter, updateDoc);

      res.redirect(`/user/${userId}`);
    }
  );

  router.get("/deleteUser/:id", helpers.isAuthenticated, async (req, res) => {
    const query = { _id: new DatabaseService.ObjectId(req.params.id) };
    await database.collections.users.deleteOne(query);
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  return router;
}

module.exports = UsersRouter;
