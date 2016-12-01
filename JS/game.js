var sound1 = "sounds/tt1.wav";
var sound2 = "sounds/tt2.wav";
var sound3 = "sounds/tt3.wav"; 
var sound4 = "sounds/tt4.wav";
var sound5 = "sounds/tt5.wav";
var sound6 = "sounds/thankyou.wav";
var playingGame = true;
var distanceFromObject = null;
var soundBeingPlayed = null;
var screenWidth = window.screen.availWidth;
var screenHeight = window.screen.availHeight;

window.onload = function() {
	randomizeXPosition();
	randomizeYPosition();
	positionChanged = true;
	randomizeImage();
	showModal();
}

function showModal() {
	var modal = document.getElementById("modal");
	modal.className = "visible";
	var text = document.getElementById("modal-text");
	text.className = "show-text";
	var audio = document.getElementById("sound");
	audio.pause();
}

function hideModal() {
	var modal = document.getElementById("modal");
	modal.style.display = "none";
	window.onmousemove = getMousePosition;
	var audio = document.getElementById("sound");
	audio.play();
}

function randomizeImage() {
	var imageList = ["dinosaur.png", "duck.png", "icecream.png", "tire.png", 
					"log.png", "sheep.png", "cucumber.png", "camel.png", 
					"phone.png", "volkswagen.png", "toyota.png", "broccoli.png",
					 "horse.png"];
	var image = imageList[Math.floor(Math.random() * imageList.length)];
	var changeImage = document.getElementById("hidden-object");
	changeImage.src = "images/" + image;
}

function randomizeXPosition() {
	xOffset = Math.floor(Math.random() * (screenWidth - 200));
	var changeXPosition = document.getElementById("target");
	changeXPosition.style.left = xOffset + "px";
	var changeImgXPosition = document.getElementById("hidden-img");
	changeImgXPosition.style.left = (xOffset - 75) + "px";
	var changeHiddenObjectXPosition = document.getElementById("hidden-object");
	changeHiddenObjectXPosition.style.left = (xOffset + 75) + "px";
}

function randomizeYPosition() {
	yOffset = Math.floor(Math.random() * (screenHeight - 350));
	var changeYPosition = document.getElementById("target");
	changeYPosition.style.top = yOffset + "px";
	var changeImgYPosition = document.getElementById("hidden-img");
	changeImgYPosition.style.top = yOffset + "px";
	var changeHiddenObjectYPosition = document.getElementById("hidden-object");
	changeHiddenObjectYPosition.style.top = (yOffset + 100) + "px";
}

function getMousePosition(e) {
	if (playingGame) {
		if (!e) {
			var e = window.event;
		}
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
	testPosition(posx, posy)
	}
}

function testPosition(x1, y1) {
	var yDistance = Math.abs(yOffset + 18 - y1);
	var xDistance = Math.abs(xOffset - x1);	
	console.log(xDistance, yDistance);
	console.log(screenWidth * .025)
	switch(true) {
		case (yDistance < screenHeight * .03) && (xDistance < screenWidth * .025):
			distanceFromObject = 5;
			console.log(distanceFromObject);
			break;
		case (yDistance < screenHeight * .1) && (xDistance < screenWidth * .1):
			distanceFromObject = 4;
			console.log(distanceFromObject);
			break;
		case (yDistance < screenHeight * .2) && (xDistance < screenWidth * .2):
			distanceFromObject = 3;
			console.log(distanceFromObject);
			break;
		case (yDistance < screenHeight * .3) && (xDistance < screenWidth * .3):
			distanceFromObject = 2;
			console.log(distanceFromObject);
			break;	
		default:
			distanceFromObject = 1;
			console.log(distanceFromObject);
	}
	if (soundBeingPlayed != distanceFromObject) {
			playSound();
	}		
}

function playSound() {
	var soundToPlay = document.getElementById("sound");
	switch (distanceFromObject) {
		case 1:
			soundToPlay.src = sound1;
			break;
		case 2:
			soundToPlay.src = sound2;
			break;
		case 3:
			soundToPlay.src = sound3;
			break;
		case 4:
			soundToPlay.src = sound4;
			break;
		case 5:
			soundToPlay.src = sound5;
			break;
		case 6:
			soundToPlay.src = sound6;
		    soundToPlay.loop = false;
		    soundToPlay.autoplay = false;
		    soundToPlay.play();
		    break;  
	}
	soundBeingPlayed = distanceFromObject;
}

function win() {
	playingGame = false;
	var displayImg = document.getElementById("hidden-img");
	displayImg.style.display = "block";
	var displayHiddenObject = document.getElementById("hidden-object");
	displayHiddenObject.style.display = "block";
	distanceFromObject = 6;
	playSound();
	document.getElementById("play-again").style.display = "block";
}



