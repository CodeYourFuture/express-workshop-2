function loadRepos(userName) {
    function onLoad() {
        const reposInfo = JSON.parse(this.responseText);

        let html = '<div class="row">';
        const repoCallback = repo => {
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
        };
        reposInfo.forEach(repoCallback);
        html += '</div>';

        const reposInfoElement = document.getElementById('reposInfo');
        reposInfoElement.innerHTML = html;
    }

    var url = 'https://api.github.com/users/' + userName + '/repos';

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', onLoad);
    oReq.open('GET', url);
    oReq.send();
}

var myButton = document.querySelector('#btnGetRepos');
const myButtonCallback = () => {
        loadRepos('CodeYourFuture');
}
myButton.addEventListener('click', myButtonCallback);