// let nav = document.getElementById("siteNav");

// nav.onclick = function() {
//     if (nav.className === "nav-list") {
//         nav.className += " responsive";
//     } else {
//         nav.className = "nav-list";
//     }
// }
'use strict';

let mobileNavIcon = document.getElementById("mobileNavIcon");
let closeBtn = document.getElementById("closeBtn");
let navContainer = document.getElementById("navContainer");
let mainWrap = document.getElementById("mainWrap");
const mediaQueryMobile = window.matchMedia("(max-width: 680px)");
const mediaQueryWeb = window.matchMedia("(min-width: 680px");
// let webLink = document.getElementById("webLink");
// let designLink = document.getElementById("designLink");
// let aboutLink = document.getElementById("aboutLink");
let siteLinks = document.querySelectorAll(".site-link");

// responsive nav
mobileNavIcon.onclick = function() {
    navContainer.className += " responsive";
}



for (let i = 0; i < siteLinks.length; i++) {
    siteLinks[i].onclick = () => {
        navContainer.className = "nav-container";
    }
}


closeBtn.onclick = function() {
    navContainer.className = "nav-container";
    
}

// nav scroll
window.addEventListener('scroll', function() {
    let header = document.getElementById('siteNavContainer');
    let windowPosition = window.scrollY > 0;

    header.classList.toggle('nav-scrolling-active', windowPosition);
})