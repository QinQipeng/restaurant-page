import "./assets/css/style.css"
import Home from "./home.js"

const content = document.querySelector("#content");

const home = new Home(content);
home.constructHome();