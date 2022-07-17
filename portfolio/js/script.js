'use strict';

let mobileNavIcon = document.getElementById("mobileNavIcon");
let closeBtn = document.getElementById("closeBtn");
let navContainer = document.getElementById("navContainer");
let mainWrap = document.getElementById("mainWrap");
let content = document.getElementById("content");
let aboutPic = document.getElementById("aboutPic");
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

// nav scroll
window.addEventListener('scroll', function() {
    let header = document.getElementById('siteNavContainer');
    let windowPosition = window.scrollY > 0;

    header.classList.toggle('nav-scrolling-active', windowPosition);
})

// scroll effect
AOS.init();

// Scroll to top button
let scrollToTopBtn = document.querySelector(".scroll-top-button");
const rootEle = document.documentElement;

function scroll() {
    let scrollTotal = rootEle.scrollHeight - rootEle.clientHeight;
    if (rootEle.scrollTop / scrollTotal > 0.2) {
        scrollToTopBtn.classList.add("showBtn");
    } else {
        scrollToTopBtn.classList.remove("showBtn");
    }
}

function scrollToTop() {
    rootEle.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", scroll)