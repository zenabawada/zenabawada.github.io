let ageLength = [21, 26, 31, 37, 41, 47, 51, 56, 60, 67, 71, 76, 80, 87, 91, 99];
let ageProgression = 1
let currentAge = 0

let statuePurchasedAmount = 0;
let statueCurrentAmount = 0;
let statueAmount = [6, 17, 32];

let age = document.getElementById('currentAge');
let statue = document.getElementById('statue');
let button = document.getElementById('buyStatue');
let purchase = document.getElementById('purchase');

// Beggining text
age.innerHTML = ageLength[0];
statue.innerHTML = 'You own no statue.<br> You\'ve made no purchase.';

let canvas = document.getElementById('canvas')
let img = document.getElementById('image');

// Background image will rotate and appear randomly on the screen
let statueImg = function(amount) {
    let max = 50;
    let min = -75;
    for (let i = 0; i < amount; i++)
    {
        let node = img.cloneNode(true);
        canvas.appendChild(node);
        node.style.top = (50 + (Math.random() * (max - min)) + min) + "%";
        node.style.left = (50 + (Math.random() * (max - min)) + min) + "%";
        node.style.transform = "rotate(" + (Math.random() * 360) + "deg)"
        node.style.display = "inline";
        node.style.overflow = "hidden";
    }
};

let deadText = document.getElementById("deadText");
let deadNoStatue = document.getElementById("noStatue");

// Age, statue and purchase numbers will change on click
button.onclick = function() {
    if (ageProgression < ageLength.length) {
        currentAge = ageLength[ageProgression++ % ageLength.length];
        age.innerHTML = currentAge;

        // let old = statueCurrentAmount;
        statueCurrentAmount += statueAmount[statuePurchasedAmount % statueAmount.length];
        statuePurchasedAmount++;
        statueImg(10);
    } else {
        button.style.display = 'none';
        deadText.style.display = 'block';
        age.style.color = 'red';
    }

    statue.innerHTML = 'You own ' + statueCurrentAmount + ' statues.<br>You\'ve purchased ' + [statuePurchasedAmount] + ' times.';
}

deadText.onclick = function() {
    canvas.style.display = 'none';
    deadNoStatue.style.display = 'block';
}

deadNoStatue.onclick = function() {
    location.reload();
}