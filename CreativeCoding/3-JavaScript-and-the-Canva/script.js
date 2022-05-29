let canvas = document.getElementById("canvasSection");
let context = canvasSection.getContext("2d");

let frame = 0;
let earthDirection = 1;
let earthLastPosition = { x: 0, y: 0, size: 0 };
let moonDirection = 1;
let moonLastPosition;
let negativeCounter = 800;
let image = new Image();
let stars = [];
let scale = 1;
let canvasClicked = false;

window.requestAnimationFrame(galaxy);

// Galaxy
function galaxy() {
	for (let i = 0; i < 200; i++) {
		stars.push({
			x: Math.random(),
			y: Math.random(),
			size: Math.random(),
			change: Math.random() * .42,
		})
	}



	function active() {
		canvasClicked = true;
		scale = 3;
	}

	function inactive() {
		canvasClicked = false;
	}

	canvas.onmousedown = active;
	canvas.onmouseup = inactive;
	canvas.addEventListener('touchend', inactive);
	canvas.addEventListener('touchstart', active);

	// canvas.onmousedown = function() {
	// 	canvasClicked = true;
	// 	scale = 3;
	// }

	// canvas.onmouseup = function() {
	// 	canvasClicked = false;
	// }
		
    image.onload = draw;
    image.src = "earth.png";
    
	//Loop
    function draw() {
        context.clearRect(0,0,800,400);

		if (scale > 1) {
			frame += scale * 4;
		}
		else {
			frame++;
		}

		starsFunction();
		if (earthDirection < 0) {
			earthFunction();
		}
        sunFunction();
		if (earthDirection >= 0) {
			earthFunction();
		}
		
		if (scale > 1) {
			if (canvasClicked == false) {
				scale -= 0.1;
			}
		}
		else {
			scale = 1;
		}

		context.fillStyle = "white";
		context.font = "18pt Arial";
		context.fillText("Click to rotate faster!", 287, 100);

		canvas.style.cursor = "pointer";
        window.requestAnimationFrame(draw);

	}
}


//Sun
function sunFunction() {
	context.lineWidth = 10;
	context.fillStyle = "rgba(255, 99, 71, 0.60)";
	context.beginPath();
	context.arc(400, 200, 45 + 3 * scale, 0, 2 * Math.PI);
	context.fill();

	context.lineWidth = 10;
	context.fillStyle = "#FFCD57";
	context.beginPath();
	context.arc(400, 200, 40, 0, 2 * Math.PI);
	context.fill();
}

//Earth
function earthFunction() {
	if (moonDirection < 0) {
		moonFunction();
	}
		
	let sin = Math.sin(frame / 630);
	let cos = Math.cos(frame / 630);
	let pos = 375 + sin * 215;
	let size = 40 + cos * 15;
	
	if (pos - earthLastPosition.x >= 0) { 
		earthDirection = 1;
	}
	else {
		earthDirection = -1;
	}
	
	context.drawImage(image, pos, 200 - 20 * sin, size, size);
	earthLastPosition.x = pos;
	earthLastPosition.y =  200 - 20 * sin;
	earthLastPosition.size = size;
	
	if (moonDirection >= 0) {
		moonFunction();
	}
}

//Moon
function moonFunction() {
	let sin = Math.sin(frame / 105);
	let cos = Math.cos(frame / 105);
	let pos = sin * earthLastPosition.size * 0.63;
	let size = earthLastPosition.size / 12 + cos * 2;
	
	if (pos - moonLastPosition >= 0) moonDirection = 1;
	else moonDirection = -1;
	context.beginPath();
	context.arc(earthLastPosition.x + earthLastPosition.size / 2 + pos, earthLastPosition.y + 20, size, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	moonLastPosition = pos;
}

//Stars
function starsFunction() {
	let sin = Math.abs(Math.sin(frame / 42));
	let i = 0;
	
	for (let star of stars) {
		let sin;
		if (i % 4 == 0) sin = Math.abs(Math.sin(frame / 21));
		else if (i % 4 == 1) sin = Math.abs(Math.cos(frame / 42));
		else if (i % 4 == 2) sin = Math.abs(Math.sin(frame / 42));
		else if (i % 4 == 3) sin = Math.abs(Math.cos(frame / 21));
		
		context.beginPath();
		context.arc(star.x * 800, star.y * 400, star.size * 3 * sin * star.change, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
		i++;
	}
}

//Reference 01: https://riptutorial.com/html5-canvas/example/16986/animate-an-image-across-the-canvas
//Reference 02: https://www.youtube.com/watch?v=v6Y8ycFAvK4