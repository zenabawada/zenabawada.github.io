// A simple middleware example to check for the existance of a logged in user
function isAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = { isAuthenticated };
