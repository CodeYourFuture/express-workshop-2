
var ajaxForm = document.getElementById("contactForm")
ajaxForm.addEventListener("submit", function(e){
    e.preventDefault();
    var form = e.target;
    
    //make a new object which grabs the form fields value and then save them to file using ajax
    var data= new Object();
    let title1=document.querySelector("#title").value
    let summary1=document.querySelector("#summary").value
    let content1=document.querySelector("#contents").value
   
    data.title = title1;
    data.summary=summary1;
    data.content=content1;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/posts');
    xhr.onload = function(data) {
        //console.log('loaded', this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    })
   
