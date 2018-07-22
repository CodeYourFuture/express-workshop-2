// Add this to the top of your file
const exphbs = require("express-handlebars");
const express = require("express");
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    author: true,
    title: "Index",
    subtitle: "Index s"
  });
});

app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    author: true,
    title: "My CV",
    subtitle: "My CV s"
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    author: true,
    title: "Admin",
    subtitle: "Admin s"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    author: true,
    title: "Contact",
    subtitle: "Contact s"
  });
});

app.use(express.static("public", { extensions: ["html"] }));

// what does this line mean: process.env.PORT || 3000

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
