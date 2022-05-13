let nav = document.getElementById("siteNav");

nav.onclick = function() {
    if (nav.className === "nav-list") {
        nav.className += " responsive";
    } else {
        nav.className = "nav-list";
    }
}