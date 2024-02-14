"use strict";

let mobileNavIcon = document.getElementById("mobileNavIcon");
let mobileNavPanel = document.querySelector("#navContainer");
let siteLinks = document.querySelectorAll(".nav-item");
let content = document.getElementById("content");
let aboutPic = document.getElementById("aboutPic");
// Footer Hover Settings
let footerList = document.querySelectorAll(".footer-wrap__item");
let formLoader = document.querySelector("#formLoader");

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
// Open Nav
mobileNavIcon.onclick = function () {
  if (mobileNavIcon.classList.contains("open")) {
    closeNav();
  } else {
    mobileNavPanel.classList.add("responsive");
    mobileNavIcon.classList.add("open");
    document.body.classList.add("fixed-scroll");
    // document.querySelector("#mainWrap").classList.add("overlay");

    // window.addEventListener("popstate", (e) => {
    //   e.preventDefault();
    //   console.log("test");
    //   closeNav();
    // });

    window.onhashchange = (e) => {
      e.preventDefault();
      closeNav();
    };
  }
};

if (mobileNavIcon.classList.contains("open")) {
}

// Close Nav
function closeNav() {
  mobileNavPanel.classList.remove("responsive");
  mobileNavIcon.classList.remove("open");
  document.body.classList.remove("fixed-scroll");
  // document.querySelector("#mainWrap").classList.remove("overlay");
}

for (let i = 0; i < siteLinks.length; i++) {
  siteLinks[i].onclick = closeNav;
}

content.onclick = closeNav;

// for (let i = 0; i < siteLinks.length; i++) {
//   siteLinks[i].onclick = () => {
//     navContainer.className = "nav-container";
//   };
// }

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

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", scroll);
}

$(function () {
  $("#sendEmailForm").on("submit", function (e) {
    e.preventDefault();
    $("#formLoader").show();

    // Serialize form data
    var formData = $(this).serialize();

    // Send form data to the server
    $.ajax({
      type: "POST",
      url: "/send-email",
      data: formData,
      success: function (response) {
        // Update the message div with the response from the server
        $("#formMessage").text(response);
        $("#sendEmailForm").hide();
      },
      error: function (error) {
        console.log(error);
        $("#formMessage").text("Error sending email. Please try again later.");
      },
      complete: function () {
        $("#formLoader").hide();
      },
    });
  });
});
