const exphbs = require("express-handlebars");
const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const filePath = __dirname + "/data/posts.json";
const savePost = require('./helpers/savePost');
const readPosts = require('./helpers/readPosts');

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); //this line is for when not using ajax for send form datas

//make the title of index page dynamic and show the posts at the end of page
app.get("/", (req, res) => {
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Mah/ViK Profile",
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});
 
app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    title: "E-mail Me"
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

//get the post ID from the request 
//search in your saved posts for the post that matches your ID 
//read the post data 
//send the post data back
app.get("/posts/:postId", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    let postsJson = JSON.parse(data);
    console.log(postsJson[0].id);
    let pid = req.params.postId;
    postsJson.forEach(element => {
      if (element.id === pid)
        res.send(element)
    });
  });
});
//make a new post and generate an id based on the last post
app.post("/posts", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    let postsJson = JSON.parse(data);
    let pid = parseInt(postsJson[0].id) + 1; //converting string form of id to number
    console.log(typeof pid)
    let newPost = {
      id: pid.toString(),
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content
    };
    savePost(newPost);
    res.redirect("/posts");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});