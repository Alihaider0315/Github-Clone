const API = "https://api.github.com/users/";
const sidebar = document.querySelector("#main");
const maincontainer = document.querySelector('#main-container-repo');
const searchBox = document.getElementById("search");
const getUser = async(username) => {
    const responce = await fetch (API + username);
    const data = await responce.json();
    const gitdata = `
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="${data.avatar_url}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">${data.name}</a>
        </div>
      </div>
      <div class="text-white">
      <h5 class="">Bio : </h5>
      <p>${data.bio}</p>
      <hr style="border-bottom : 1px solid #4f5962">
      <h5 class="">Email :</h5>
      <p>${data.email}</p>
      <a class="btn btn-success w-100" href="${data.html_url}">Visit Profile</a>
    `

sidebar.innerHTML = gitdata;
getRepos(username)

const repodata = `<div class="row">
<div class="col-lg-3 col-6">
  
  <div class="small-box bg-info">
    <div class="inner">
      <h3>${data.followers}</h3>
      <p>Followers</p>
    </div>
    <div class="icon">
      <i class="ion ion-person"></i>
    </div>
  </div>
</div>

<div class="col-lg-3 col-6">
 
  <div class="small-box bg-success">
    <div class="inner">
      <h3>${data.following}</h3>

      <p>Following</p>
    </div>
    <div class="icon">
      <i class="ion ion-person-add"></i>
    </div>
   
  </div>
</div>

<div class="col-lg-3 col-6">
  
  <div class="small-box bg-warning">
    <div class="inner">
      <h3>${data.stars}</h3>

      <p>Stars On Repository</p>
    </div>
    <div class="icon">
      <i class="ion ion-star"></i>
    </div>
   
  </div>
</div>

<div class="col-lg-3 col-6">
  
  <div class="small-box bg-danger">
    <div class="inner">
      <h3>${data.public_repos}</h3>

      <p>Public Repository</p>
    </div>
    <div class="icon">
      <i class="ion ion-pie-graph"></i>
    </div>

  </div>
</div>

</div>`

maincontainer.innerHTML = repodata;

}
// init Call
// getUser("alihaider0315");

const getRepos = async (username) => {
 try{
  const repos = document.getElementById("public-repos");
  const response = await fetch(API + username + "/repos");
  const data = await response.json();
  console.log(data);

  
  let row = document.createElement("div");
  row.classList.add("row");

  data.forEach((item, index) => {
    if (index % 3 === 0 && index !== 0) {
      repos.appendChild(row);
      row = document.createElement("div");
      row.classList.add("row");
    }

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-sm-4");

    const card = document.createElement("div");
    card.classList.add("card", "w-100");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = item.full_name;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = item.description || "No description provided.";

    const cardStars = document.createElement("p");
    cardStars.classList.add("card-text");
    cardStars.innerHTML = `<i class="fas fa-star"></i> Stars: ${item.stargazers_count}`;

    const cardForks = document.createElement("p");
    cardForks.classList.add("card-text");
    cardForks.innerHTML = `<i class="fas fa-code-branch"></i> Forks: ${item.forks_count}`;

    const cardVisibility = document.createElement("p");
    cardVisibility.classList.add("card-text" , "label-class");
    cardVisibility.innerHTML = item.private
      ? `<i class="fas fa-lock"></i> Private`
      : `<i class="fas fa-globe"></i> Public`;

    const cardLink = document.createElement("a");
    cardLink.classList.add("btn", "btn-primary");
    cardLink.href = item.html_url;
    cardLink.target = "_blank";
    cardLink.innerText = "Go to repository";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardStars);
    cardBody.appendChild(cardForks);
    cardBody.appendChild(cardLink);
    cardBody.appendChild(cardVisibility);
    card.appendChild(cardBody);
    cardDiv.appendChild(card);
    row.appendChild(cardDiv);
  });

  if (row.children.length > 0) {
    repos.appendChild(row);
  }
} catch (error) {
  createErrorCard("Error fetching repositories");
}
};
    



const formSubmit = (e) => {
  if (searchBox.value != "") {
      getUser(searchBox.value);
      searchBox.value = "";
  }
  return false;
}

searchBox.addEventListener("focusout", () => {
  formSubmit();
})

const createErrorCard = (msg) => {
  const cardHTML = `
      <div class="card">
          <h1>${msg}</h1>
      </div>
  `
  main.innerHTML = cardHTML;
  
}