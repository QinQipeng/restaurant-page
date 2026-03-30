import "./assets/css/style.css"
import "./assets/css/about.css"

import Home from "./home.js"
import Menu from "./menu.js"
import About from "./about.js"

const content = document.querySelector("#content");
const nav = document.querySelector("nav");
const navButtons = {}
let currentPage;

function deconstructPage() {
    const toBeRemoved = document.querySelectorAll("#content > *")
    toBeRemoved.forEach(element => {
        content.removeChild(element);
    })
}

nav.querySelectorAll("button").forEach(button => {
    navButtons[button.classList[0]] = button;
})

navButtons["home"].addEventListener("click",(e) => {
    if(currentPage) currentPage.classList.remove("focused");
    
    const home = new Home(content);
    deconstructPage();
    home.constructHome();
    currentPage = navButtons["home"];
    currentPage.classList.add("focused");
})

navButtons["menu"].addEventListener("click",(e) => {
    if(currentPage) currentPage.classList.remove("focused");
    
    const menu = new Menu(content);
    deconstructPage();
    menu.constructMenu();
    currentPage = navButtons["menu"];
    currentPage.classList.add("focused");
})

navButtons["about"].addEventListener("click",(e) => {
    if(currentPage) currentPage.classList.remove("focused");
    
    const about = new About(content);
    deconstructPage();
    about.constructAbout();
    currentPage = navButtons["about"];
    currentPage.classList.add("focused");
})


navButtons["home"].click();