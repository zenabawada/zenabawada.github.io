let confirmDelete = null;
let passwordInput = null;
let passwordInputConfirm = null;
let currentPassword = null;

setup();

function setup() {
  if (!confirmDelete) {
    confirmDelete = document.querySelectorAll(".confirm-delete");
    confirmDelete.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (!confirm("Are you sure?")) {
          e.preventDefault();
        } else {
          alert("Successfully deleted.");
        }
      });
    });
  }

  if (!currentPassword) {
    currentPassword = document.querySelector("#current-password");
    toggleCurrentPassword();
  }

  if (!passwordInput) {
    passwordInput = document.querySelector("#password");
    togglePassword();
  }

  if (!passwordInputConfirm) {
    passwordInputConfirm = document.querySelector("#passwordConfirm");
    togglePasswordConfirm();
  }

  // editBtns;
}

function swalConfirmation() {
  swal("Account created!", "", "success");
}

function swalPostConfirmation() {
  swal("Post created!", "", "success");
}

function passwordConfirmation() {
  let password = document.querySelector("#password").value;
  return confirm(
    `
    Please confirm your information:
    Password: ${password}
  `
  );
}
function editUserEmailConfirmation() {
  let email = document.querySelector("#email").value;
  return confirm(
    `
    Please confirm your information:

    Email: ${email}
  `
  );
}

function editUserConfirmation() {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  return confirm(
    `
    Please confirm your information:

    Name: ${fname}
    Last Name: ${lname}
  `
  );
}

function confirmation() {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let email = document.querySelector("#email").value;
  return confirm(
    `
    Please confirm your information:

    Name: ${fname}
    Last Name: ${lname}
    Email: ${email}    
  `
  );
}
function toggleCurrentPassword() {
  let togglePassword = document.querySelector(".toggle-password");
  currentPasswordInput = document.querySelector("#current-password");
  if (togglePassword && currentPasswordInput) {
    togglePassword.addEventListener("click", () => {
      let type =
        currentPasswordInput.getAttribute("type") === "password"
          ? "text"
          : "password";

      currentPasswordInput.setAttribute("type", type);

      if (currentPasswordInput.getAttribute("type") === "text") {
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      } else {
        togglePassword.classList.add("fa-eye");
        togglePassword.classList.remove("fa-eye-slash");
      }
    });
  }
}

function togglePassword() {
  let togglePassword = document.querySelector(".toggle-password");
  passwordInput = document.querySelector("#password");
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      let type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";

      passwordInput.setAttribute("type", type);

      if (passwordInput.getAttribute("type") === "text") {
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      } else {
        togglePassword.classList.add("fa-eye");
        togglePassword.classList.remove("fa-eye-slash");
      }
    });
  }
}

function togglePasswordConfirm() {
  let togglePassword = document.querySelector(".toggle-passwordconfirm");
  passwordInputConfirm = document.querySelector("#passwordConfirm");
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      let type =
        passwordInputConfirm.getAttribute("type") === "password"
          ? "text"
          : "password";

      passwordInputConfirm.setAttribute("type", type);

      if (passwordInputConfirm.getAttribute("type") === "text") {
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      } else {
        togglePassword.classList.add("fa-eye");
        togglePassword.classList.remove("fa-eye-slash");
      }
    });
  }
}

// function editBtns() {
//   let editBtn = document.querySelector(".edit-post-button");
//   let deleteBtn = document.querySelector(".confirm-delete");

//   editBtn.addEventListener("click", () => {
//     let url = editBtn.getAttribute("data-url");
//     console.log(url);
//     // window.open(url, "_blank");
//   });

//   deleteBtn.addEventListener("click", () => {
//     let url = deleteBtn.getAttribute("data-url");
//     window.location.replace(url);
//   });
// }

// Reference: https://stackoverflow.com/questions/67845383/how-to-make-a-confirm-dialog-appear-before-form-post-request-in-ejs-template
