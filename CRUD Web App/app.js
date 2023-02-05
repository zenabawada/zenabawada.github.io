// Imports
const DatabaseService = require("./database/database.js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const FeedbackRouter = require("./routes/feedback.js");
const AuthRouter = require("./routes/auth.js");
const PostsRouter = require("./routes/posts.js");
const UsersRouter = require("./routes/users.js");
const { Server } = require("socket.io");
const http = require("http");
const cookieParser = require("cookie-parser");
const FeedbackService = require("./feedback.js");
const swal = require("sweetalert");

async function setupServer() {
  const PORT = process.env.PORT || 3000;
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  app.use(bodyParser());
  app.use(cookieParser());
  // Setting the view engine to render ejs templates
  app.set("view engine", "ejs");
  // Creating an instance of the Database service class
  const database = new DatabaseService.Database();
  await database.setup();

  const feedbackService = new FeedbackService(database, io);
  feedbackService.setup();

  app.use("/", AuthRouter(database));
  app.use("/", PostsRouter(database));
  app.use("/", UsersRouter(database));
  app.use("/", FeedbackRouter());

  server.listen(PORT, () => {
    // Once the app is running we can start the database setup
    console.log(`Server Started on port ${PORT}`);
  });

  app.use(express.static(path.join(__dirname, "public")));

  app.use((req, res, next) => {
    res.status(404).render("error/error.ejs");
  });

  process.on("SIGTERM", () => {
    app.close(() => {
      // If the app is shutdown we close the database connection
      database.client.close();
    });
  });
}

setupServer();
