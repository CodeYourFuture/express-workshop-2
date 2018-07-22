const exphbs = require("express-handlebars");
const express = require("express");
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { extensions: ["html"] }));

app.get("/", (req, res) => {
  res.render("index", {
    //title: "Seraphine Profile",
    subheading: "I am girl learning Node.js" // insert your name instead
  });
});

app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    title: "MY personal CV",
    subheading: "My letter of application"
  });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    title: "ADMISTRATION STUFF",
    subheading: "Admin work is boring"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "PLEASE DO NOT DISTURB,I AM CODING",
    subheading: "I am all EARS"
  });
});

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
