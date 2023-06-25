const buttonContainer = document.querySelector(".dark-mode-toggle-bg");
const button = buttonContainer.querySelector(".dark-mode-toggle-button");
const bullets = document.getElementsByClassName("bullet-point");
const source = document.getElementsByClassName("definition-link")[0];
const moon = document.querySelector(".moon");
const search = document.querySelector(".search-form");

console.log(button);

buttonContainer.addEventListener("mouseup", toggleDarkMode);

function toggleDarkMode(e) {
    toggleButton();
    toggleBackground();
    toggleSourceColor();
    toggleMoonColor();
    toggleSearchBarColor();
    toggleDropdown();
}

function toggleButton() {
    button.classList.toggle("dark");
    buttonContainer.classList.toggle("dark");
}

function toggleBackground() {
    body.classList.toggle("dark-mode");
    for(let i = 0; i < bullets.length; i++) {
        bullets[i].classList.toggle("dark");
    }
}

function toggleSourceColor() {
    source.classList.toggle("dark");
}

function toggleMoonColor() {
    console.log(moon);
    if(!moon.classList.contains("dark")) {
        moon.src = "assets/images/icon-moon-purple.svg";
        moon.classList.add("dark");
    } else {
        moon.src = "assets/images/icon-moon.svg";
        moon.classList.remove("dark");
    }
}

function toggleSearchBarColor () {
    search.classList.toggle("dark");
}

function toggleDropdown() {
    dropdown.classList.toggle("dark");
}