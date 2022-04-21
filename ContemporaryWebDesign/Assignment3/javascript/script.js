let icon = document.getElementById('navIcon');

icon.onclick = function() {
    let topNav = document.getElementById('topNav');
    if (topNav.className === 'topnav') {
        topNav.className += ' responsive';
    } else {
        topNav.className = 'topnav';
    }
}