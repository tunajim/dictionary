const fontToggler = document.getElementById("font-select");
const dropdown = fontToggler.querySelector(".dropdown");
const fonts = document.getElementsByClassName("font-list-item");
const label = document.getElementsByClassName("dropdown-label")[0];
const body = document.getElementsByTagName("body")[0];

fontToggler.addEventListener("mouseup", activateDropdown);

for(let i = 0; i < fonts.length; i++){
    fonts[i].addEventListener("mouseup", changeFont);
}

function changeFont(e) {
    console.log(e.target);
    if(e.target.classList.contains("sans")) {
        label.innerHTML = 'Sans Serif <img src="../assets/images/icon-arrow-down.svg" alt="select button"></img>';
        label.style.fontFamily = "'Inter', sans-serif";
        body.style.fontFamily = "'Inter', sans-serif";
        
    } else if(e.target.classList.contains("serif")) {
        label.innerHTML = 'Serif <img src="../assets/images/icon-arrow-down.svg" alt="select button"></img>';
        label.style.fontFamily = "'Lora', serif";
        body.style.fontFamily = "'Lora', serif";
    } else if(e.target.classList.contains("mono")) {
        label.innerHTML = 'Mono <img src="../assets/images/icon-arrow-down.svg" alt="select button"></img>';
        label.style.fontFamily = "'Inconsolata', mono";
        body.style.fontFamily = "'Inconsolata', mono";
    }
}

function activateDropdown(e) {
    dropdown.classList.add("active");
    fontToggler.removeEventListener("mouseup", activateDropdown);
    setTimeout(() => {
        window.addEventListener("click", deactivateDropdown);
    }, 500);
}

function deactivateDropdown(e) {
    if(!e.target.classList.contains("block")){
        dropdown.classList.remove("active");
        window.removeEventListener("click", deactivateDropdown);
        fontToggler.addEventListener("mouseup", activateDropdown);
    }
}