const DatabaseService = require("../database/database.js");
const express = require("express");
const helpers = require("../helpers/auth.js");

function PostsRouter(database) {
  var router = express.Router();

  router.get("/", async (req, res) => {
    let user = req.user;

    let posts = await database.collections.posts
      .find()
      .sort({ date: -1 })
      .toArray();

    res.render("index", {
      posts: posts,
      profileUser: user,
    });
  });

  router.get("/new", helpers.isAuthenticated, async (req, res) => {
    res.render("posts/new.ejs", {
      errorMessage: req.query.errorMessage || null,
    });
  });

  router.get("/post/:id", async (req, res) => {
    let post = await database.collections.posts.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    res.render("posts/existing.ejs", { post: post });
  });

  router.get("/editPost/:id", helpers.isAuthenticated, async (req, res) => {
    let post = await database.collections.posts.findOne(
      new DatabaseService.ObjectId(req.params.id)
    );

    res.render("posts/editPost.ejs", { post: post });
  });

  router.post("/new", helpers.isAuthenticated, async (req, res) => {
    let data = req.body;
    let user = req.user;
    let post = await database.collections.posts.insertOne({
      ...data,
      userId: user.id,
      username: user.username,
      userImage: user.profileImage,
      date: new Date().toLocaleString(),
    });
    let postId = post.insertedId.toString();

    res.redirect(`/post/${postId}`);
  });

  router.post("/editPost/:id", helpers.isAuthenticated, async (req, res) => {
    let data = req.body;
    let postId = req.params.id;
    const filter = { _id: new DatabaseService.ObjectId(req.params.id) };
    const updateDoc = {
      $set: {
        ...data,
      },
    };
    await database.collections.posts.updateOne(filter, updateDoc);

    res.redirect(`/post/${postId}`);
  });

  router.get("/delete/:id", helpers.isAuthenticated, async (req, res) => {
    // let postId = req.params.id;
    const query = { _id: new DatabaseService.ObjectId(req.params.id) };
    await database.collections.posts.deleteOne(query);

    res.redirect("/");
  });

  return router;
}

module.exports = PostsRouter;
