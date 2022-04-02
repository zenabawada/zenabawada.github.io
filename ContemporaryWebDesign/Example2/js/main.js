let menu = document.getElementById("menu");
let menuIcon = document.getElementById("menuIcon");
menuIcon.onclick = function() {
    menu.classList.toggle('nav-expanded');
}