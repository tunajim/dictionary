
const form = document.getElementById("word-search");
const input = form.querySelector(".search-input");
const errorMessage = document.querySelector(".error-message");
let headerCount = 0;
const darkModeSelector = document.querySelector(".dark-mode-toggle-bg");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(input.value === "") {
        errorMessage.classList.add("active");
        form.style.border = "1px solid #FF5252";
    } else {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
            .then(response => response.json())
            .then(data => {
                clearInfo();
                populateDefinition(data[0]);
                headerCount = 0;
            })
            .catch(error => {
                console.error(error)
            });
    }
})

input.addEventListener("input", (e) => {
    form.style.border = "none";
    errorMessage.classList.remove("active");
})

function clearInfo() {
    console.log(info.firstElementChild);
    while(!info.firstElementChild.classList.contains("source-section")) {
        info.removeChild(info.firstChild);
    }
}

const wordName = document.getElementById("word-name");
const sourceSection = document.getElementsByClassName("source-section")[0];
const info = document.querySelector(".info");

function populateDefinition(data) {
    wordName.textContent = data.word;
    for(let i = 0; i < data.meanings.length; i++) {
        const definition = createDefinitionComponent(data.word, data.meanings[i], data.phonetic);
    }
}

function createDefinitionComponent(word, meaning, pronunciation) {

    const mainHeader = buildHeader(word, meaning, pronunciation);



    const meaningType = makeElement("h3", ["italic"], meaning.partOfSpeech);
    const meaningContainer = makeElement("div", ["flex"], "");

    const definitionSection = makeElement("section", [], "");
    const header = makeElement("h5", [], "Meaning");
    const list = makeElement("ul", ["definition-list"], "");
    list.setAttribute.id = "meaning-list";

    meaning.definitions.forEach(element => {
        const definition = createDefinition(meaning.type, element); 
        
        if(element.example == undefined) {
            list.append(definition);
        } else {
            const example = createDefinition('example', element.example);
            list.append(definition);
            list.append(example);
        }
    });


    definitionSection.append(header);
    definitionSection.append(list);

    const hr = makeElement("hr", [], "");



    meaningContainer.append(meaningType);
    meaningContainer.append(hr);
    if(headerCount < 1){
        info.insertBefore(mainHeader, sourceSection);
        headerCount++;
    }
    info.insertBefore(meaningContainer, sourceSection);
    info.insertBefore(definitionSection, sourceSection);
}

function buildHeader(word, meaning, pronunciation) {
    const mainHeaderSection = makeElement("section", ["flex", "space-between", "center", "align-center"], "");
    const labelDiv = makeElement("div", [], "");
    const mainWord = makeElement("h1", [], word);
    mainWord.setAttribute.id = "word-name";
    const pronunc = makeElement("h2", [], pronunciation)
    const playIcon = makeElement("img", ["play-icon"], "");
    playIcon.src = "assets/images/icon-play.svg";
    playIcon.setAttribute.alt = "play word audio";

    labelDiv.append(mainWord);
    labelDiv.append(pronunc);

    mainHeaderSection.append(labelDiv);
    mainHeaderSection.append(playIcon);

    return mainHeaderSection;
}


function makeElement(type, classes, text) {
    const element = document.createElement(type);
    for(let i = 0; i < classes.length; i++) {
        element.classList.add(classes[i]);
    }
    if(classes.indexOf("no-dot-list-item") != -1) {
        element.textContent = `"${text}"`;
    } else {
        element.textContent = text;
    }
    return element;
}

function createDefinition(type, el) {
    let li, div, p;
    if(type !== "example") {
        li = makeElement("li", [], '');
        div = makeElement("div", ["dots"], '•');
        p = makeElement("p", ["bullet-point"], el.definition); 
    } else {
        li = makeElement("li", [], '');
        div = makeElement("div", ["dot", "invisible"], '•');
        p = makeElement("span", ["no-dot-list-item"], el);
    }

    if(darkModeSelector.classList.contains("dark")) {
        console.log("worked");
        p.classList.add("dark");
    }

    li.append(div, p);

    return li;
}

