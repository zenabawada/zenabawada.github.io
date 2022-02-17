//Interaction 01
function validateForm() {
    let messageInput = document.forms["contactForm"]["formText"].value;


    // if (messageInput == "") {
    //     return alert("Invalid message.");
    // }
    // return alert("Thank you for your message!");

    

    // if (messageInput == "") {
    //     alert("Invalid message.");
    // } else {
    //     alert("Thank you for your message!");
    // }

    messageInput ? sendForm(messageInput) : alert("Invalid message.");
}

function sendForm(msg) {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    
    xhr.open("POST", "https://docs.google.com/forms/d/e/1FAIpQLScIV1_S2ZS1R9hhkR4DMcDpLu7DnOvsbRYr5EyxSVVAggV1PA/formResponse?", true);
    form.append("entry.1008843678", msg);
    
    xhr.send(form);
    alert("Thank you for your message!");
}

//Interaction 02
function changeColor(element, newColor) {
    element.style.color = newColor;
}

function resetColor(element) {
    element.style = element.style.default;
}

//Interaction 03
let modal = document.getElementById("modalBlock");
let img = document.getElementById("myImg");
let modalImg = document.getElementById("img01");

// img.onclick = function() {
//     modal.style.display = "block";
//     modalImg.src = this.src;

function ModalImage(image) {
    modal.style.display = "block";
    modalImg.src = image.src;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        paragraph.style.display = "none";
    }
}

// Interaction 04
let button = document.getElementById("showContent");
let paragraph = document.getElementById("modalParagraph");

// button.onclick = function() {    
//     if (paragraph.style.display == "none") {
//         paragraph.style.display = "flex";
//         document.getElementById("showContent").innerHTML = "Show less";
//     } else {
//         paragraph.style.display = "none";
//         document.getElementById("showContent").innerHTML = "Show more";
//     }
// }

button.onclick = function() {    
    if (paragraph.style.display == "flex") {
        paragraph.style.display = "none";
        document.getElementById("showContent").innerHTML = "Show more";
    } else {
        paragraph.style.display = "flex";
        document.getElementById("showContent").innerHTML = "Show less";
    }
}