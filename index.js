const API = 'https://api.github.com/users/'

const result = document.getElementById("result")
const search = document.getElementById("search")
const form = document.getElementById("form")

async function getUser(username) {
    try{
        const {data} = await axios(API + username)

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

function addRepos(repos){
    const repos = document.getElementById("repos")

    repos.slice(0 ,5).forEach(repo =>{
        const reposy = document.createElement("a")
        reposy.classList.add("repo")
        reposy.href = repo.html_url
        reposy.target = '_blank'
        reposy.innerText = repo.name

        repos.appendChild(reposy)
    })
}