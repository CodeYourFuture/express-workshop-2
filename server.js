
const express = require("express");
const app = express();
const fs=require('fs');
const exphbs = require("express-handlebars");


// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", {'extensions': ['html']}));


// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
// app.get("/contact-information",function(err,res){
//   res.send("welcome to contact me page");
  
// })
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get("/", (req, res) => {
//   const extraDataForTheTemplate = {
//     title: "Mahsa Profile",
//     sig: "signame"
//   }
//   res.render("index", 
//     extraDataForTheTemplate
//   );
// });
app.get("/my-cv", (req, res) => {
  res.render("my-cv");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();

    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);

    // send the json to the Template to render
    res.render("index", {
      title: "Mahsa Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});