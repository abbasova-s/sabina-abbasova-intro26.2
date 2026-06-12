const footer = document.createElement("footer");
const body = document.body;
body.appendChild(footer);

const today = new Date()
const thisYear = today.getFullYear();

const footerEl = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.textContent = `\u00A9 Sabina ${thisYear}`;
footerEl.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub"];
const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

for (let i=0; i<skills.length; i++){
    const skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener("submit", function(e){
    e.preventDefault();

    const usersName = e.target.usersName.value;
    const usersEmail = e.target.usersEmail.value;
    const usersMessage = e.target.usersMessage.value;

    console.log(usersName);
    console.log(usersEmail);
    console.log(usersMessage);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");

    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span>${usersMessage}</span>`;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";
    removeButton.addEventListener ("click", function(){
        const entry = removeButton.parentNode;
        entry.remove();
    })

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
});

const projectSection = document.getElementById("projects"); 
const projectList = projectSection.querySelector("ul");

fetch('https://api.github.com/users/abbasova-s/repos') 
.then(function(response){ 
    return response.json(); }) 
.then(function(data){ 
    const repositories = data; 
    for (let i=0; i<repositories.length; i++){ 
        const project = document.createElement("li");
        const link = document.createElement("a");
        link.href = repositories[i].html_url;
        link.target = "_blank";
        link.innerText = repositories[i].name;
        project.appendChild(link);
        projectList.appendChild(project); 
    } console.log(repositories); 
}) 
.catch(function(error){ 
    console.error(error); 
    const p = document.createElement("p"); 
    p.innerText = "Not able to load projects at this time"; 
    projectSection.appendChild(p); 
})
