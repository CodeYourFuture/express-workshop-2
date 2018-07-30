const exphbs = require("express-handlebars");
const express = require("express");
const fs = require("fs");
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { extensions: ["html"] }));

app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Seraphine Profile",
      // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Seraphine Profile",
    subheading: "I am girl learning Node.js",
    backgroundImage: "url here" // insert your name instead
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

app.get("/contactme", (req, res) => {
  res.render("contact", {
    title: "PLEASE DO NOT DISTURB,I AM CODING",
    subheading: "I am all EARS"
  });
});

const filePath = __dirname + "/data/posts.json";

app.get("/posts/:postId", function(req, res) {
  //console.log(req);
  var newDataJson = fs.readFileSync(filePath, "utf8");
  var newdataObj = JSON.parse(newDataJson);
  //console.log("newDataObj");

  var singlePost = newdataObj.filter(OneitemInpostFile => {
    return OneitemInpostFile.postId === parseInt(req.params.postId); // parseInt is to change the recieve recieve postid to number.
  });
  console.log(singlePost);
  res.render("post", { post: singlePost[0] }); //post is the new handlebar file we created.

  // post is the key and stores the data in

  //res.send(JSON.stringify(singlePost));
});

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
