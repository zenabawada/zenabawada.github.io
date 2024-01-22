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

  // app.get("/techschool", async (req, res) => {
  //   res.render("techschool.ejs");
  // });

  // app.get("/camumusushi", async (req, res) => {
  //   res.render("camumusushi.ejs");
  // });

  const MdFetch = async (name) => {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${name}`
    );
    return await res.json();
  };

  app.get("/articles", async (req, res) => {
    const MEDIUM_NAME = "@zenab.awada";

    try {
      const data = await MdFetch(MEDIUM_NAME);

      // Assuming 'items' is a property in the response data
      const items = data.items;

      res.render("articles.ejs", { items: items });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json(error.message);
    }
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
