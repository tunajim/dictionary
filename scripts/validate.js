
const form = document.getElementById("word-search");
const input = form.querySelector(".search-input");
const errorMessage = document.querySelector(".error-message");
let headerCount = 0;
const darkModeSelector = document.querySelector(".dark-mode-toggle-bg");
let hr = makeElement("hr", [], "");
const overlay = document.querySelector(".overlay");

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
                deactivateOverlay();
                (data[0] === undefined) ?
                    displayErrorMessage():
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

function deactivateOverlay() {
    overlay.classList.remove("active");
}

function displayErrorMessage() {
    overlay.classList.add("active");
}


function clearInfo() {
    console.log(info.firstElementChild);
    while(info.firstChild) {
        info.removeChild(info.firstChild);
    }
}

const wordName = document.getElementById("word-name");
const sourceSection = document.getElementsByClassName("source-section")[0];
const info = document.querySelector(".info");

function populateDefinition(data) {
    wordName.textContent = data.word;
    for(let i = 0; i < data.meanings.length; i++) {
        const definition = createDefinitionComponent(data.word, data.meanings[i], data.phonetic, data.sourceUrls[0]);
    }

    const sourceSection = addSource(data.sourceUrls[0]);
    info.append(hr.cloneNode(true));
    info.append(sourceSection); 
}

function addSource(source) {
    const sourceContainer = makeElement("section", ["source-section"], "");
    const sourceLabel = makeElement("h6", ["light-gray-text"], "Source");
    const definitionLink = makeElement("a", ["definition-link"], "");
    definitionLink.setAttribute("href", source)
    const sourceSpan = makeElement("span", [], source);
    const newWindowIcon = makeElement("img", [], "");
    newWindowIcon.setAttribute("src", "assets/images/icon-new-window.svg");
    newWindowIcon.setAttribute("alt", "open new window");

    if(darkModeSelector.classList.contains("dark")) {
        definitionLink.classList.add("dark");
    }

    sourceContainer.append(sourceLabel);
    definitionLink.append(sourceSpan);
    definitionLink.append(newWindowIcon);
    sourceContainer.append(definitionLink);

    return sourceContainer;
}

function createDefinitionComponent(word, meaning, pronunciation, source) {
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

    const hrClone = makeElement("hr", [], "");



    meaningContainer.append(meaningType);
    meaningContainer.append(hr.cloneNode(true));


    if(headerCount < 1){
        info.append(mainHeader);
        headerCount++;
    }
    info.append(meaningContainer);
    info.append(definitionSection);

    if(meaning.synonyms.length > 0) {
        const synonymContainer = createSynonymSection(meaning);
        info.append(synonymContainer);
    }
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

function createSynonymSection(meaning) {
    const synonymContainer = makeElement("section", ["flex"], "");
    synonymContainer.style.alignItems = "center";
    const synonymLabel = makeElement("h5", [], 'Synonyms');
    const synonym = makeElement("p", ["synonym"], meaning.synonyms[0]);
    synonymContainer.append(synonymLabel);
    synonymContainer.append(synonym);
    return synonymContainer;
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
        p.classList.add("dark");
    }

    li.append(div, p);

    return li;
}

