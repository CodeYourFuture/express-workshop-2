const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");
const app = express();
// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html

app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Awet Profile", // insert your name instead
      name: "Awet Fessha",
      age: 25,
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});
app.get("/my-cv", function(req, res) {
  res.render("my-cv", { name: "Awet Fessha", age: 25 });
});
app.get("/admin", function(req, res) {
  res.render("admin", {
    name: "Awet Fessha",
    age: 25
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", { name: "Awet Fessha", age: 25 });
});
app.use(express.static("public", { extensions: ["html"] }));
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3001, function() {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});
