// Imports
// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
import express from "express";
import * as path from "path";
// import { bodyParser } from "body-parser";
// import { path } from "path";
import { Configuration, OpenAIApi } from "openai";
import * as url from "url";
import * as dotenv from "dotenv";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Server app setup
async function setupServer() {
  dotenv.config();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const app = express();
  const PORT = process.env.PORT || 3000;
  //   app.use(bodyParser());
  app.set("view engine", "ejs");

  app.get("/", async (req, res) => {
    res.render("index.ejs");
    console.log(process.env.OPENAI_API_KEY);
  });

  app.post("/generate", async (req, res) => {
    // ---------------------------------
    try {
      let prompt = req.body.prompt;

      let response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
      });
      res.status(200).send({
        bot: response.data.choices(0).text,
      });
    } catch (error) {
      res.status(500).send(error || "Something went wrong");
    }

    res.render("index.ejs");
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
