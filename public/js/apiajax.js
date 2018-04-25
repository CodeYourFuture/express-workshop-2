var apiurl = "http://quotesondesign.com/wp-json/posts";
var apiButton = document.querySelector("a.btn.btn-success");
console.log(apiButton); //shows button

apiButton.addEventListener("click", function (e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiurl);
    xhr.onload = function (xhr) {
        let html = '<div class="post-preview">'
        reconstruct(this.responseText)
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.responseText)
    xhr.send();
})
function reconstruct(arg) {
    let postInfo = this.responseText
    let posts = post => {
        html += `<a href="post.html">
                <h2 class="post-title">${post.title}
                </h2>
        <h3 class= "post-subtitle">${post.content}
        </h3>
        </a>
            <p class="post-meta"> Posted by ${post.link}
                <a href="#"> </a> on july 8,2018 </p>`;
    }
    postInfo.forEach(posts);
    html += '</div>';
    const postInfoElement = document.getElementById('postInfo');
    postInfoElement.innerHTML = html;
}