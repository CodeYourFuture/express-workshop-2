const fs = require('fs')
const express = require("express");

// Add this to the top of your file
const exphbs = require("express-handlebars");
const app = express();
// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
const filePath = __dirname + "/data/posts.json";
let postsJson;
app.get("/", (req, res) => {
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Raj Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

app.get("/admin", (req, res) => {
  res.render("admin", {title: "Welcome to Admin"});
});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", { title: "Repos List From Github" });
});
app.get("/contact", (req, res) => {
  res.render("contact", {title: "xxxxxWelcome to Contact"});
});
app.get("/posts", (req, res) => {
  res.render("post")
  // res.sendFile(filePath);
});
app.get("/posts/:id", (req, res) => {
  if (postsJson ){
    let postJson = postsJson.filter(post => post.postid == req.params.id)
    res.render("post", { layout: "main", post: postJson[0] })
  }
});
app.use(express.static("public", { 'extensions': ['html'] }));
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});