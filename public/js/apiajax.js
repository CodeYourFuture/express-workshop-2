var apiurl = "http://quotesondesign.com/wp-json/posts";
var apiButton = document.querySelector("a.btn.btn-success");
console.log(apiButton); //shows button

apiButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e);
    var button = e.target;
    console.log(button);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiurl);
    xhr.onload = function (xhr) {
        let html = '<div class="post-preview">'
        reconstruct(this.responseText)

    postInfo.forEach(posts);
    html += '</div>';
    const postInfo = this.responseText;
    const postInfoElement = document.getElementById('postInfo');
    postInfoElement.innerHTML = html;
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.responseText)
    xhr.send();
})
function reconstruct(arg) {
    const postInfo = this.responseText;
    const posts = post => {
        html += `<a href="post.html">
                <h2 class="post-title">${post.title}
                </h2>
        <h3 class= "post-subtitle">${post.content}
        </h3>
        </a>
            <p class="post-meta"> Posted by ${post.link}
                <a href="#"> </a>on july 8,2018 </p>`;
    }
}