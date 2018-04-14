const exphbs = require("express-handlebars");
const express = require("express");
const app = express();




// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html



// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Viktor Protsenko" // insert your name instead
  });
});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    title: "E-mail Me" // insert your name instead
  });
});
app.get("/admin", (req, res) => {
  res.render("admin", {
    title: "Admin Page"
  });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.use(express.static("public", {'extensions': ['html']}));