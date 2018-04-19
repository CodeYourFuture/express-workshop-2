
var ajaxForm = document.getElementById("contactForm")
ajaxForm.addEventListener("submit", function(e){
    e.preventDefault();
    var form = e.target;
    console.log(form);
    var data = new FormData(ajaxForm);
    data.append("title","name")
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
    })
   
