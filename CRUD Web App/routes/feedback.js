const express = require("express");
function feedbackRouter() {
  var router = express.Router();

  // Rendering the main view where all the messages are shown
  router.get("/", async (req, res) => {
    res.render("register", {});
  });

  return router;
}

module.exports = feedbackRouter;
