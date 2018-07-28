const exphbs = require("express-handlebars");//we need the handlebar library
const express = require("express");
const app = express(); //the app we are making calls the express function from the top
const fs = require("fs");
const fetch = require('node-fetch')

app.engine("handlebars", exphbs({ defaultLayout: "main" }));//here is the configuration(which engine will be used (ext))
app.set("view engine", "handlebars");
//app.set= Assigns setting name to value view engine=The default engine extension to use when omitted..

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { 'extensions': ['html'] }));
//express.static built-in middleware serve static files such as image, css, js. express.static(root,[option])
//root specifies the root directory from which to serve static assets
//extension sets files extension fallbacks: if a file is not found search for files 
//with specified extension and serve the first one found.
// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Behnaz ",
//     subheading: "look carefully!"
//   });//app.get(Routes HTTP GET requests to the specified path,callback function)
// });
app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Behnaz Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});
app.get("/my-cv", async (req, res) => {
  const fetchData = await fetch("https://api.github.com/users/behnazz/repos", {
    method: "GET"
  })
  const response = await fetchData.json()
  console.log(response)


  res.render("my-cv", {
    title: "My coding CV",
    subheading: "my letter of application",
    repos: response.name

  });//res.render(view [, locals] [, callback]) = Renders a view and sends the rendered HTML string to the client. 
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
//when we deploying this application to a hosting environment a post is dynamically assigned 
//by the hosting environment so we can't rely on 3000 to be available
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});