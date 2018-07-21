const express = require("express");

// Add this to the top of your file
const exphbs = require("express-handlebars");
const app = express();
// Then these two lines after you initialise your express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", {'extensions': ['html']}));

app.get("/contact", (req, res) => {
  res.send("This is a contact page");
});
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});