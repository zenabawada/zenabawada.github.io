/* Steps required:
  - Create a variable for each element that is going to be referenced in the DOM;
  - Create a variable for each condition (age to drive, visit a casino, and purchase alcohol);
  - Create a function for age check;
  - Within the age check function, create a switch or ternary conditional operator to check if user's input (age) meets certain condition.
*/

const form = document.querySelector("form");
const ageInput = document.querySelector("#age");
const submitBtn = document.querySelector("#submit");
// form.onsubmit = "return false";

// Minimum age to drive in Ontario
const driveAge = 16;
// Minimum age to visit a casino in Ontario
const casinoAge = 19;
// Minimum age to purchase alcohol in Ontario
const alcoholAge = 19;

// Age Check function
let ageCheck = function () {
  // Age input from the user
  let ageValue = ageInput.value;

  // Check if user is old enough to drive, visit a casino, and purchase alcohol
  switch (true) {
    case ageValue < driveAge &&
      ageValue < casinoAge &&
      ageValue < alcoholAge &&
      ageValue != "":
      alert(
        "You aren't old enough to drive, visit a casino, and purchase alcohol. Wait a little bit!"
      );
      break;

    case ageValue >= driveAge &&
      ageValue < casinoAge &&
      ageValue < alcoholAge &&
      ageValue != "":
      alert(`You can drive but can't visit a casino and purchase alcohol.`);
      break;

    case ageValue >= driveAge &&
      ageValue >= casinoAge &&
      ageValue >= alcoholAge &&
      ageValue != "":
      alert(
        `You are old enough to drive, visit a casino, and purchase alcohol. Hurray!`
      );
      break;

    case ageValue === "":
      alert("Please type your age.");
      break;
  }
};

// Age Check function on submit button click
submitBtn.onclick = ageCheck;
