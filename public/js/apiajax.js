var apiurl = "https://blooming-spire-76019.herokuapp.com/posts";
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
                <h2 class="post-title">${post.title}</h2>
                <h3 class="post-subtitle">${post.summary}</h3>
                <p class="post-meta">${post.content}</p>
                <hr>`
        }
        postInfo.forEach(posts);
        html += '</div>';
        const postInfoElement = document.getElementById('postInfo');
        postInfoElement.innerHTML = html;
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
});