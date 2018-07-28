
function loadRepos(userName) {
    //in the next line  use XMLHttpRequest to issue HTTP requests  in order to exchange data between the web site and a server.
    function onLoad() {
        const reposInfo = JSON.parse(this.responseText);
        // I think I should move this code below to cv handle bar
        let html = '<div class="row">';
        reposInfo.forEach((repo) => {
            const description = repo.description ? repo.description.substring(0, 50) : "No Description";

            html += `<div class="col-sm-6 col-md-4">
                <div class="thumbnail repo-info">
                <div class="caption">
                    <h3>${repo.name}</h3>
                    <p>${description}</p>
                    <p>
                        <a href="${repo.html_url}" role="button">
                            Go to Repo
                        </a>
                    </p>
                </div>
                </div>
            </div>`;
        });
        html += '</div>';

        const reposInfoElement = document.getElementById('reposInfo');
        reposInfoElement.innerHTML = html;
    }
    // use XMLHttpRequest to issue HTTP requests  in order to exchange data between the web site and a server.
    var url = 'https://api.github.com/users/' + userName + '/repos';

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', onLoad);
    oReq.open('GET', url);
    oReq.send();
}

var myButton = document.querySelector('#btnGetRepos');
myButton.addEventListener('click', () => {
    loadRepos('CodeYourFuture');
}); //this is a callback function for button