let responsesArray =
  localStorage.getItem("responsesCache") == null
    ? []
    : JSON.parse(localStorage.getItem("responsesCache"));

let form = document.getElementById("form");
let promptText = document.getElementById("prompt");
let responseSubmitted = document.getElementById("responseSubmitted");
let promptSubmitted = document.getElementById("promptSubmitted");
let submitBtn = document.getElementById("submit");
let clearResponsesBtn = document.getElementById("clearResponsesButton");

let responsesContainer = document.getElementById("responses-container");
let node = document.getElementById("response-box");
let presetBtn = document.getElementById("promptPreset");
let loadingModal = document.getElementById("loadingModal");

console.log(
  "Github Repository: https://github.com/zenabawada/zenabawada.github.io/tree/main/Zenawada/Shopify"
);
UpdateResponses();

function promptPreset() {
  promptText.value =
    "Find the most spoken language \n\nCanada: English \nGreece:";
}

function output(prompt, response) {
  if (response != null) {
    responsesArray.push({
      promptValue: prompt,
      responseValue: response.result,
    });
    localStorage.setItem("responsesCache", JSON.stringify(responsesArray));
    UpdateResponses();
  }
}

// function output(prompt, response) {
//   if (response != null) {
//     responsesArray.push({
//       promptValue: prompt,
//       responseValue: response.result,
//     });
//     localStorage.setItem("responsesCache", JSON.stringify(responsesArray));
//     UpdateResponses();
//   }
// }

function UpdateResponses() {
  while (
    responsesContainer.firstElementChild != null &&
    responsesContainer.childElementCount > 1
  ) {
    responsesContainer.removeChild(responsesContainer.firstElementChild);
  }

  for (let i = 0; i < responsesArray.length; i++) {
    DrawResponse(responsesArray[i]);
  }

  if (responsesArray.length > 0) {
    clearResponsesBtn.style.display = "block";
  } else {
    clearResponsesBtn.style.display = "none";
  }

  responsesContainer.style.display = "flex";
}

function DrawResponse(response) {
  const node = responsesContainer.lastElementChild;
  const clone = node.cloneNode(true);
  const id = "response-box-" + responsesContainer.childElementCount;
  clone.id = id;

  responsesContainer.insertBefore(clone, responsesContainer.firstElementChild);

  document
    .getElementById(id)
    .getElementsByClassName("promptSubmitted")[0].innerHTML =
    response.promptValue;
  document
    .getElementById(id)
    .getElementsByClassName("responseSubmitted")[0].innerHTML =
    response.responseValue;
  document
    .getElementById(id)
    .getElementsByClassName("responseRemoveButton")[0].onclick =
    removeResponseBox;
  document.getElementById(id).getElementsByClassName("tryButton")[0].onclick =
    function () {
      TryAgain(response);
    };

  function removeResponseBox() {
    RemoveResponse(response);
    $(document).ready(function () {
      $(".responses-container div:first-child").css("animation", "none");
    });
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
    localStorage.setItem("responsesCache", JSON.stringify(responsesArray));
    UpdateResponses();
  }
}

function TryAgain(response) {
  promptText.value = response.promptValue;
}

function SetWaitingResponseState(imWaiting) {
  if (imWaiting) {
    loadingModal.style.display = "flex";
  } else {
    loadingModal.style.display = "none";
  }
}

// submitBtn.onclick = function () {
//   if (!promptText.value) return;

//   SetWaitingResponseState(true);
//   fetch(
//     "https://afternoon-lowlands-42708.herokuapp.com/open_ai?prompt=" +
//       promptText.value,
//     {
//       //   mode: "no-cors",
//       method: "GET",
//       "Access-Control-Allow-Origin": "*",
//     }
//   )
//     .then((data) => data.json())
//     .then((success) => {
//       output(promptText.value, success);
//       promptText.value = "";
//       SetWaitingResponseState(false);
//     })
//     .catch(function (error) {
//       console.log("Request failed", error);
//       SetWaitingResponseState(false);
//     });
// };

submitBtn.onclick = function () {
  if (!promptText.value) return;

  SetWaitingResponseState(true);
  fetch("/open_ai?prompt=" + encodeURIComponent(promptText.value))
    .then((response) => response.json())
    .then((data) => {
      output(promptText.value, data);
      promptText.value = "";
      SetWaitingResponseState(false);
    })
    .catch(function (error) {
      console.log("Request failed", error);
      SetWaitingResponseState(false);
    });
};

clearResponsesBtn.onclick = ClearReponses;
presetBtn.onclick = promptPreset;
