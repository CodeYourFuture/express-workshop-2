const exphbs = require("express-handlebars");
const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const filePath = __dirname + "/data/posts.json";
const savePost = require('./helpers/savePost');

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html

// what does this line mean: process.env.PORT || 3000

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Mah/ViK Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
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

app.get("/posts", (req, res) => {
  res.sendFile(filePath);
});

// app.get('/posts/:postId', function (req, res) {
//   res.send('post id: ' + req.params.postId);
// });

app.post("/posts", (req, res) => {
  let newPost = {
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content
  };
  savePost(newPost);
  res.redirect("/admin");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

