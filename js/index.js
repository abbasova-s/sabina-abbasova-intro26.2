const footer = document.createElement("footer");
const body = document.body;
body.appendChild(footer);

const today = new Date()
const thisYear = today.getFullYear();

const footerEl = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.textContent = `\u00A9 Sabina ${thisYear}`;
footerEl.appendChild(copyright);

const skills = ["JavaScrips", "HTML", "CSS", "GitHub"];
const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

for (let i=0; i<skills.length; i++){
    const skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

