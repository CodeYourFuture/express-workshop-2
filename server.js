const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/my-cv", function(req, res) {
  res.render("my-cv");
});
app.get("/admin", function(req, res) {
  res.render("admin");
});
app.use(express.static("public", { extensions: ["html"] }));
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3001, function() {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});
