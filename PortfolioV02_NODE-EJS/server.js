// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { parse } = require("rss-to-json");

// Server app setup
async function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(bodyParser());
  app.set("view engine", "ejs");

  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  // app.get("/techschool", async (req, res) => {
  //   res.render("techschool.ejs");
  // });

  // app.get("/camumusushi", async (req, res) => {
  //   res.render("camumusushi.ejs");
  // });

  app.get("/articles", async (req, res) => {
    let rss = await parse("https://medium.com/feed/@zenab.awada");
    let items = rss.items;

    res.render("articles.ejs", { items: items });
  });

  app.get("/design", async (req, res) => {
    res.render("design.ejs", {});
  });

  // Middleware for serving static file
  app.use(express.static(path.join(__dirname, "public")));

  app.enable("trust proxy");
  app.use((req, res, next) => {
    res.redirect("https://" + req.headers.host + req.url);
  });

  // Start server on specified port
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

setupServer();