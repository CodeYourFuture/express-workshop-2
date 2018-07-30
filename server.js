const fs = require('fs')
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// Add this to the top of your file
const exphbs = require("express-handlebars");
const app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));
const filePath = __dirname + "/data/posts.json";
let postsJson;
const registeredAdmin = {
  username: 'rraju12@gmail.com',
  password: '654321'
}
const auth = (req = {}, res) => {
  const { username, password } = req.body
  return registeredAdmin.username === username &&
    registeredAdmin.password === password
}
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
  // if (auth(req, res)) {
  //   res.render("admin", { title: "Welcome to Admin" });
  // }
  res.render('login', {title: "Welcome to login!"})
  // res.send("please login!<a href='/login'>log in</a>")
});
app.post("/login", urlencodedParser, (req, res) => {
  if (auth(req, res)) {
    res.render("admin", { title: "Welcome to Admin" });
  } else{
    res.send("please login!<a href='/admin'>log in</a>");
  }

});
app.get("/my-cv", (req, res) => {
  res.render("my-cv", { title: "Repos List From Github" });
});
app.get("/contact", (req, res) => {
  res.render("contact", {title: "xxxxxWelcome to Contact"});
});

app.get("/posts/:id", (req, res) => {
    postsJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let postJson = postsJson.filter(post => post.postid == req.params.id)
    res.render("post", { post: postJson[0] })
});
app.post("/post", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const allPosts = fs.readFileSync(filePath, 'utf8');
  const jsAllPostsArray = JSON.parse(allPosts)
  const postid = jsAllPostsArray.length + 1
  const newPost = { postid, ...req.body };
  jsAllPostsArray.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(jsAllPostsArray, null, 2));
  // res.redirect(`/posts/${postid}`); after reloading it works! 
  res.redirect(`/posts`);
  // I am not able to redirect from here: any idea? 
  // res.send("<h1>your data has been saved successfully!</h1><a href='/'>Go back</a>")
});
app.get("/posts", (req, res) => {
  res.sendFile(filePath);
});
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});