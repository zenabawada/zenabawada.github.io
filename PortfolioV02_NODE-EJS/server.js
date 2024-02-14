// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

// Server app setup
async function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(bodyParser());
  app.set("view engine", "ejs");

  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      host: "mail.zenawada.ca", // SMTP server hostname
      port: 465, // SMTP server port (usually 587 for TLS/STARTTLS)
      secure: true, // true for 465, false for other ports
      auth: {
        user: "contact@zenawada.ca", // SMTP server username
        pass: "@myEmail654", // SMTP server password
      },
    });

    let mailOptions = {
      from: email, // Sender address
      to: "contact@zenawada.ca", // Recipient address
      subject: "ZENAWADA New Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        // res.send("Error sending email. Please try again later.");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Thank you for your message!");
      }
    });
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
