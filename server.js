const exphbs = require("express-handlebars");
const express = require("express");
const app = express();

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.static("public", { 'extensions': ['html'] }));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Behnaz",
    subheading: "look carefully!"
  });
});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    title: "My coding CV",
    subheading: "my letter of application"
  });
});
app.get("/admin", (req, res) => {
  res.render("admin", {
    title: "Who is the admin of this site?",
    subheading: "I don't like admin work"
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "How can you contact me?",
    subheading: "please contact when I am not coding"
  });
});

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});