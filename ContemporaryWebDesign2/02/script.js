// Create a text area
// Create a submit button
// Create an unordered list where chat message will be stored
// Each time a text is submitted, a list item is created

let chatBox = document.querySelector("#chat");
let textBox = document.querySelector("#textBox");
let submitBtn = document.querySelector("#submit");
let clearBtn = document.querySelector("#clear");

// New list item creation function
let chatLog = () => {
  let listItem = document.createElement("li");
  let content = textBox.value;
  let date = new Date().toDateString();

  listItem.innerHTML = `<span id="chatDate">${date}</span>${content}`;

  chatBox.appendChild(listItem);
};

// Log list item on submit button click
submitBtn.onclick = chatLog;

// Clear chat function
let clearChat = () => {
  chatBox.innerHTML = "";
};

// Clear chat on button click
clearBtn.onclick = clearChat;
