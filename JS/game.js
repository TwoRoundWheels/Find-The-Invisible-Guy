var sound1 = "sounds/tt1.wav";
var sound2 = "sounds/tt2.wav";
var sound3 = "sounds/tt3.wav"; 
var sound4 = "sounds/tt4.wav";
var sound5 = "sounds/tt5.wav";
var sound6 = "sounds/thankyou.wav";
var positionChanged = false;
var playingGame = true;
var distanceFromObject = null;
var soundBeingPlayed = null;
var screenWidth = window.screen.availWidth;
var screenHeight = window.screen.availHeight;

window.onload = function() {
	if (positionChanged == false) {
		randomizeXPosition();
		randomizeYPosition();
		positionChanged = true;
		randomizeImage();
		showModal();
	}
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

var testPosition = function(x1, y1) {	
	if (Math.abs(yOffset - y1 + 10) < (screenHeight * .03) 
		&& Math.abs(xOffset - x1 + 10) < (screenWidth * .025)) {
		distanceFromObject = 5;	
		if (soundBeingPlayed != distanceFromObject) {
			playSound();
		}								
	}
	else if (Math.abs(yOffset - y1) < (screenHeight * .1) 
		&& Math.abs(xOffset - x1) < (screenWidth * .1)) {
		distanceFromObject = 4;
		if (soundBeingPlayed != distanceFromObject) {
			playSound();
		}				
	}
	else  if (Math.abs(yOffset - y1) < (screenHeight * .2) 
		&& Math.abs(xOffset - x1) < (screenWidth * .2)) {
		distanceFromObject = 3;
		if (soundBeingPlayed != distanceFromObject) {
			playSound();
		}				
	}
	else if (Math.abs(yOffset - y1) < (screenHeight * .3) 
		&& Math.abs(xOffset - x1) < (screenWidth * .3)) {
		distanceFromObject = 2;
		if (soundBeingPlayed != distanceFromObject) {
			playSound();
		}				
	}
	else {
		distanceFromObject = 1;
		if (soundBeingPlayed != distanceFromObject) {
			playSound();
		}
	}
}

function playSound() {
    if (distanceFromObject == 1) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound1;
	}
	if (distanceFromObject == 2) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound2;
	}
	if (distanceFromObject == 3) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound3;
	}
	if (distanceFromObject ==  4) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound4;
	}
	if (distanceFromObject == 5) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound5;
	}
	if (distanceFromObject == 6) {
		var soundToPlay = document.getElementById("sound");
		soundToPlay.src = sound6;
	    soundToPlay.loop = false;
	    soundToPlay.autoplay = false;
	    soundToPlay.play();
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



