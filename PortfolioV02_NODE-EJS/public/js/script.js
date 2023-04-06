"use strict";

let mobileNavIcon = document.getElementById("mobileNavIcon");
let closeBtn = document.getElementById("closeBtn");
let navContainer = document.getElementById("navContainer");
let mainWrap = document.getElementById("mainWrap");
let content = document.getElementById("content");
let aboutPic = document.getElementById("aboutPic");
let siteLinks = document.querySelectorAll(".site-link");

// Footer Hover Settings
let footerList = document.querySelectorAll(".footer-wrap__item");

for (const item of footerList) {
  item.addEventListener("mouseenter", showOpacity, false);
  item.addEventListener("mouseleave", hideOpacity, false);
}

function showOpacity() {
  for (const item of footerList) {
    if (this === item) continue;
    item.style.opacity = 0.5;
  }
}

function hideOpacity() {
  for (const item of footerList) {
    item.style.opacity = 1;
  }
}

// Responsive Nav
mobileNavIcon.onclick = function () {
  navContainer.className += " responsive";
};

for (let i = 0; i < siteLinks.length; i++) {
  siteLinks[i].onclick = () => {
    navContainer.className = "nav-container";
  };
}

function closeNav() {
  navContainer.className = "nav-container";
}

closeBtn.onclick = closeNav;
content.onclick = closeNav;

// Nav Scroll
window.addEventListener("scroll", function () {
  let header = document.getElementById("siteNavContainer");
  let windowPosition = window.scrollY > 0;

  header.classList.toggle("nav-scrolling-active", windowPosition);
});

// Scroll To Top Effect
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

// Articles
let details = document.querySelectorAll(".details");

for (let i = 0; i < details.length; i++) {
  let html = details[i].querySelector(".html");
  // console.log(html.innerHTML);

  let description = details[i].querySelector(".description");
  // console.log(description);

  description.innerHTML = html.innerText;

  let count = 200;
  let newDescription = description.innerText;

  let result =
    newDescription.slice(0, count) +
    (newDescription.length > count ? "..." : "");

  description.innerHTML = result;
}

function scrollToTop() {
  rootEle.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", scroll);
