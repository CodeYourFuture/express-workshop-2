var apiurl = "http://quotesondesign.com/wp-json/posts";
var apiButton=document.querySelector("a.btn.btn-success");
console.log(apiButton); //shows button

apiButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log(e);
    var button = e.target;
    console.log(button);
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiurl);
    xhr.onload = function(xhr) {
        console.log('loaded', this.responseText);
        reconstruct(this.responseText)
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.responseText)
    xhr.send("sasas");
    })
   function reconstruct(arg){
       var divPosts = document.createElement("div");
        var posts= JSON.parse(arg);
        
        console.log(posts);
   }