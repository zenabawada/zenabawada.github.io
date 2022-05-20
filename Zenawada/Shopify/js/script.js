// import API_KEY from "../index.js";

let responsesArray = localStorage.getItem('responsesCache') == null ? [] : JSON.parse(localStorage.getItem('responsesCache'));
		
let form = document.getElementById("form");
let promptText = document.getElementById("prompt");
let responseSubmitted = document.getElementById("responseSubmitted")
let promptSubmitted = document.getElementById("promptSubmitted");
let submitBtn = document.getElementById("submit");
let clearResponsesBtn = document.getElementById("clearResponsesButton");

let responsesContainer = document.getElementById("responses-container");
let node = document.getElementById("response-box");
let presetBtn = document.getElementById("promptPreset");


UpdateResponses();

function promptPreset() {
    promptText.value = "Find the most spoken language \n\nBrazil: Portuguese \nCanada: English \nGreece:";
}

function output(prompt, response) {
    if (response != null) {
        console.log(response);
        responsesArray.push({ promptValue: prompt, responseValue: response["choices"][0]["text"] });
        localStorage.setItem('responsesCache', JSON.stringify(responsesArray));
        UpdateResponses();
    }
}

function UpdateResponses() {
    console.log("update");
    while (responsesContainer.firstChild != null && responsesContainer.childElementCount > 1) {
        responsesContainer.removeChild(responsesContainer.firstChild);
    }
    
    for (let i = 0; i < responsesArray.length; i++) {
        DrawResponse(responsesArray[i]);
    };

    if (responsesArray.length > 0) {
        clearResponsesBtn.style.display = "block";
    } 
    else {
        clearResponsesBtn.style.display = "none";
    }

    responsesContainer.style.display = "flex";
}

function DrawResponse(response) {
    const node = responsesContainer.lastChild;
    const clone = node.cloneNode(true);
    const id = "response-box-" + responsesContainer.childElementCount;
    clone.id = id;
    
    responsesContainer.insertBefore(clone, responsesContainer.firstChild);
    document.getElementById(id).getElementsByClassName("promptSubmitted")[0].innerHTML = response.promptValue;
    document.getElementById(id).getElementsByClassName("responseSubmitted")[0].innerHTML = response.responseValue;
    document.getElementById(id).getElementsByClassName("responseRemoveButton")[0].onclick = removeResponseBox;
    document.getElementById(id).getElementsByClassName("tryButton")[0].onclick = function() { TryAgain(response) };

    function removeResponseBox() {
        RemoveResponse(response);
        $( document ).ready(function() {
            $(".responses-container div:first-child").css("animation" , "none");
        })
    }
}

function ClearReponses() {
    responsesArray = [];
    localStorage.clear();
    UpdateResponses();
}

function RemoveResponse(response) {
    if (response != null && responsesArray.length >= 0) {
        responsesArray.splice(responsesArray.indexOf(response), 1);
        localStorage.setItem('responsesCache', JSON.stringify(responsesArray));
        UpdateResponses();
    }
}

function TryAgain(response) {
    promptText.value = response.promptValue
}

submitBtn.onclick = function() {
    if (!promptText.value) return;

    let data = {
        prompt: promptText.value,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    }

    
    fetch("https://afternoon-lowlands-42708.herokuapp.com/open_ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then(success => {
        output(promptText.value, success);
        promptText.value = "";
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });

    
    /*
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then(success => {
        output(promptText.value, success);
        promptText.value = "";
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });    */
}

clearResponsesBtn.onclick = ClearReponses;
presetBtn.onclick = promptPreset;