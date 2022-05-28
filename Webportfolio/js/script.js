// let nav = document.getElementById("siteNav");

// nav.onclick = function() {
//     if (nav.className === "nav-list") {
//         nav.className += " responsive";
//     } else {
//         nav.className = "nav-list";
//     }
// }

let mobileNavIcon = document.getElementById("mobileNavIcon");
let closeBtn = document.getElementById("closeBtn");
let navContainer = document.getElementById("navContainer");
let mainWrap = document.getElementById("mainWrap");
const mediaQueryMobile = window.matchMedia("(max-width: 680px)");
const mediaQueryWeb = window.matchMedia("(min-width: 680px");

mobileNavIcon.onclick = function() {
    navContainer.className += " responsive";
}

closeBtn.onclick = function() {
    navContainer.className = "nav-container";
}