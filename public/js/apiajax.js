var apiurl = "https://portfoliocyf.herokuapp.com/posts";
var apiButton = document.querySelector("a.btn.btn-success");

apiButton.addEventListener("click", function (e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiurl);
    xhr.onload = function (xhr) {
        let html = '<div class="post-preview">';
        let postInfo = JSON.parse(this.responseText);
        let posts = post => {
            html += `<a href="post.html">
                <h2 class="post-id">${post.id}</h2>
                <h2 class="post-title">${post.title}</h2>
                <h3 class="post-summary">${post.summary}</h3>
                <h3 class="post-content">${post.content}</h3>`;
        }
        postInfo.forEach(posts);
        html += '</div>';
        const postInfoElement = document.getElementById('postInfo');
        postInfoElement.innerHTML = html;
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
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
