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

function output(prompt, response) {
    if (response != null) {
        console.log(response);
        responsesArray.push({ promptValue: prompt, responseValue: response["choices"][0]["text"] });
        localStorage.setItem('responsesCache', JSON.stringify(responsesArray));
        UpdateResponses();
    }
}

function outputTest(prompt, response) {
    // => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    responsesArray.push({ promptValue: prompt, responseValue: response });
    localStorage.setItem('responsesCache', JSON.stringify(responsesArray));
    UpdateResponses();
}

function UpdateResponses() {
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
    // responsesContainer.style.transition = "all 0.5s ease-in-out";
}

function DrawResponse(response) {
    const node = responsesContainer.lastChild;
    const clone = node.cloneNode(true);
    const id = "response-box-" + responsesContainer.childElementCount;
    clone.id = id;
    
    //responsesContainer.appendChild(clone);
    responsesContainer.insertBefore(clone, responsesContainer.firstChild);
    document.getElementById(id).getElementsByClassName("promptSubmitted")[0].innerHTML = response.promptValue;
    document.getElementById(id).getElementsByClassName("responseSubmitted")[0].innerHTML = response.responseValue;
    document.getElementById(id).getElementsByClassName("responseRemoveButton")[0].onclick = function() { RemoveResponse(response) };
    document.getElementById(id).getElementsByClassName("tryButton")[0].onclick = function() { TryAgain(response) };
    
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

// function output(success) {
//     responsesContainer.style.display = "block";
//     promptSave.innerHTML = promptText.value;
//     responseSave.innerHTML = success["choices"][0]["text"];
//     console.log(success);
// }

let index = 0;
submitBtn.onclick = function() {
    let data = {
        prompt: promptText.value,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    }

    
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
        },
        body: JSON.stringify(data),
    })
    .then(data => data.json())
    .then(success => {
        output(promptText.value, success);
        promptText.value = "";
    })
        // console.log('Request succeeded with JSON response', data)
    // .catch(function (error) {
    //     console.log('Request failed', error);
    // });
    
    /*
    let s = index % 3 == 0 ? "One" : index % 3 == 1 ? "Two" : "Three";
    outputTest(promptText.value, "Test response " + s);
    promptText.value = "";
    index++;*/
}

clearResponsesBtn.onclick = ClearReponses;
presetBtn.onclick = promptPreset;





function promptPreset() {
    promptText.value = "Find the most spoken language \n\nBrazil: Portuguese \nCanada: English \nGreece:";
}



// Response Box Fade-In

// $(document).ready(function() {
//     $('#submit').click(function() {
//         // alert("test");
//         $(".response-box").slideUp();
//     });
// })