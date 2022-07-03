'use strict';

let mobileNavIcon = document.getElementById("mobileNavIcon");
let closeBtn = document.getElementById("closeBtn");
let navContainer = document.getElementById("navContainer");
let mainWrap = document.getElementById("mainWrap");
let content = document.getElementById("content");

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

function closeNav() {
    navContainer.className = "nav-container";
}

content.onclick = closeNav;
closeBtn.onclick = closeNav;

// nav scroll
window.addEventListener('scroll', function() {
    let header = document.getElementById('siteNavContainer');
    let windowPosition = window.scrollY > 0;

    header.classList.toggle('nav-scrolling-active', windowPosition);
})

// scroll effect
AOS.init();
