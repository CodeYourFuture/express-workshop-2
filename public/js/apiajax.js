var apiurl = "http://quotesondesign.com/wp-json/posts";
var apiButton=document.querySelector("btn btn-success");
console.log(apiButton);

ajaxForm.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(e);
    var form = e.target;
    console.log(form);

    //var data = new FormData(ajaxForm);
    var data= new Object();
    let title1=document.querySelector("#title").value
    let summary1=document.querySelector("#summary").value
    let content1=document.querySelector("#contents").value
    console.log(title1,"titleee");
    data.title = title1;
    data.summary=summary1;
    data.content=content1;
    console.log(data);
    
    
    var xhr = new XMLHttpRequest();
    // var data = {
    //     param1: 'value1',
    //     param2: 'value2',
    //     param3: 'value3'
    // };
    console.log(data);
    xhr.open('POST', '/posts');
    xhr.onload = function(data) {
        //console.log('loaded', this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    console.log(JSON.stringify(data));
    })
   