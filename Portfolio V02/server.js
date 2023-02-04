// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Server app setup
async function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(bodyParser());
  app.set("view engine", "ejs");

  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  app.get("/techschool", async (req, res) => {
    res.render("techschool.ejs");
  });

  app.get("/camumusushi", async (req, res) => {
    res.render("camumusushi.ejs");
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
