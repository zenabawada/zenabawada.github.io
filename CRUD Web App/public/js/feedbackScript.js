let socket = io();
let socketID = null;

let emailInput = null;
let typing = null;
let fName = null;
let lName = null;
let password = null;
let passwordConfirm = null;
let sendButton = null;
let passwordValid = false;
let emailValid = false;
let inputsFilled = null;
// let emailValidSyntax = false;

setup();

function setup() {
  passwordConfirm = document.querySelector("#passwordConfirm");
  password = document.querySelector("#password");
  fName = document.querySelector("#fname");
  lName = document.querySelector("#lname");
  sendButton = document.querySelector("#submitBtn");
  emailInput = document.querySelector("#email");

  if (fName) {
    fName.addEventListener("input", checkSendButton);
    checkSendButton();
  }

  if (lName) {
    lName.addEventListener("input", checkSendButton);
    checkSendButton();
  }

  if (passwordConfirm) {
    passwordConfirm.addEventListener("input", passwordValidation);
    checkSendButton();
  }

  if (password) {
    password.addEventListener("input", passwordValidation);
    checkSendButton();
  }

  if (emailInput) {
    // emailInput.addEventListener("input", typingMessage);
    emailInput.addEventListener("input", emailValidation);
    emailInput.addEventListener("input", checkEmailDatabase);
    checkSendButton();
  }

  // checkSendButton();
}

// function typingMessage() {
//   console.log("typing");
// }

function checkSendButton() {
  // inputsFilled = fName.value && lName.value;
  if (
    (password && passwordConfirm ? passwordValid : true) &&
    (fName && lName ? fName.value && lName.value : true) &&
    (emailInput ? emailValid : true)
  ) {
    sendButton.disabled = false;
  } else {
    sendButton.disabled = true;
  }
}

function passwordValidation() {
  password = document.querySelector("#password");
  passwordConfirm = document.querySelector("#passwordConfirm");
  let parentDiv = passwordConfirm.parentElement;
  let span = parentDiv.querySelector(".error");

  if (
    passwordConfirm.value != password.value ||
    password.value === "" ||
    passwordConfirm.value === ""
  ) {
    passwordValid = false;
    span.style.display = "block";
  } else if (passwordConfirm.value === password.value) {
    passwordValid = true;
    span.style.display = "none";
  }
  checkSendButton();
}

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function emailValidation() {
  emailInput = document.querySelector("#email");

  if (validateEmail(emailInput.value)) {
    emailInput.style.borderColor = "green";
    emailInput.style.borderWidth = "2px";

    // emailValidSyntax = true;
  } else {
    emailValid = false;
    emailInput.style.borderColor = "red";
    emailInput.style.borderWidth = "2px";
    // emailValidSyntax = false;
  }
  checkSendButton();
}

function checkEmailDatabase() {
  let email = document.querySelector("#email").value;
  if (validateEmail(email)) {
    socket.emit("checkEmail", { email: email });
  }
}

function checkBannedWords() {
  let input = document.querySelector("#fname").value;
  socket.emit("checkWords", { input: input });
}

socket.on("connect", () => {
  socketID = socket.id;
});

socket.on("checkWords", (input) => {
  let parentDiv = document.querySelector("#fname").parentElement;
  let span = parentDiv.querySelector(".error");

  if (input === true) {
    span.style.display = "block";
  } else if (input === false) {
    span.style.display = "none";
  }
});

socket.on("checkEmail", (email) => {
  emailInput = document.querySelector("#email");
  let parentDiv = document.querySelector("#email").parentElement;
  let span = parentDiv.querySelector(".email-error");

  if (email) {
    emailValid = false;
    emailInput.style.borderColor = "red";
    emailInput.style.borderWidth = "2px";
    span.style.display = "block";
  } else if (!email) {
    emailValid = true;
    span.style.display = "none";
  }
  checkSendButton();
});
