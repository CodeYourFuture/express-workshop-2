const express = require("express");

// Add this to the top of your file
const exphbs = require("express-handlebars");
const app = express();
// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.get("/", (req, res) => {
  res.render("index", {
    title: "Raj profile" // insert your name instead
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {title: "Welcome to Admin"});
});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", { title: "Repos List From Github" });
});
app.get("/contact", (req, res) => {
  res.render("contact", {title: "Welcome to Contact"});
});
app.use(express.static("public", { 'extensions': ['html'] }));
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});