const API = 'https://api.github.com/users/'

const result = document.getElementById("result")
const search = document.getElementById("search")
const form = document.getElementById("form")

async function getUser(username) {
    try{
        const {data} = await axios(API + username)

        createCard(data)
        getRepos(username)
    }catch(err){
        throw new Error(err)
    }
}

async function getRepos(username){
    try{
        const {data} = await axios(API + username + '/repos?sort=created')

        addRepos(data)
    }catch(err){
        throw new Error(err)
    }
}

function addRepos(rep){
    const repos = document.getElementById("repos")

    rep.slice(0 ,5).forEach(repo =>{
        const reposy = document.createElement("a")
        reposy.classList.add("repo")
        reposy.href = repo.html_url
        reposy.target = '_blank'
        reposy.innerText = repo.name

        repos.appendChild(reposy)
    })
}

function createCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>

        <div id="repos"></div>
        </div>
    </div>
    `

    result.innerHTML = cardHTML
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})