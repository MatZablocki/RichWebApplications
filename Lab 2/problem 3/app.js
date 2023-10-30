const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const avatarImg = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const loginElement = document.getElementById("login");
const emailElement = document.getElementById("email");
const locationElement = document.getElementById("location");
const gistsElement = document.getElementById("gists");
const reposTable = document.getElementById("repos").getElementsByTagName('tbody')[0];

searchBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    if (username) {
        fetchUserData(username);
    }
});

function fetchUserData(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            avatarImg.src = data.avatar_url;
            nameElement.textContent = `Name: ${data.name}`;
            loginElement.textContent = `Username: ${data.login}`;
            emailElement.textContent = `Email: ${data.email || 'N/A'}`;
            locationElement.textContent = `Location: ${data.location || 'N/A'}`;
            gistsElement.textContent = `Number of Gists: ${data.public_gists}`;

            fetchUserRepos(username);
        })
        .catch(error => {
            console.error(error);
            clearUserInfo();
            clearUserRepos();
        });
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            clearUserRepos();
            data.forEach(repo => {
                const row = reposTable.insertRow();
                const nameCell = row.insertCell(0);
                const descriptionCell = row.insertCell(1);
                nameCell.textContent = repo.name;
                descriptionCell.textContent = repo.description || 'N/A';
            });
        })
        .catch(error => {
            console.error(error);
            clearUserRepos();
        });
}

function clearUserInfo() {
    avatarImg.src = '';
    nameElement.textContent = '';
    loginElement.textContent = '';
    emailElement.textContent = '';
    locationElement.textContent = '';
    gistsElement.textContent = '';
}

function clearUserRepos() {
    while (reposTable.firstChild) {
        reposTable.removeChild(reposTable.firstChild);
    }
}
