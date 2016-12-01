//Initialize variables.
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

//On window load, select a random X and Y position for the hidden guy to be 
//placed at and show the intro dialogue.
window.onload = function() {
	randomizeXPosition();
	randomizeYPosition();
	randomizeImage();
	showIntro();
}

//Animate intro text and pause the sound player.  Sound player needs to be 
//paused because audio element has autoplay to true.  Setting autoplay to true 
//after the page loads wouldn't play the audio once the game started, and
//leaving the audio source blank is technically not valid HTML. 
function showIntro() {
	var intro = document.getElementById("intro");
	intro.className = "visible";
	var text = document.getElementById("intro-text");
	text.className = "show-text";
	var audio = document.getElementById("sound");
	audio.pause();
}

//Hide the intro text.  Here the game will begin tracking the mouse position and 
//the sound will resume playing.
function hideIntro() {
	var intro = document.getElementById("intro");
	intro.style.display = "none";
	window.onmousemove = getMousePosition;
	var audio = document.getElementById("sound");
	audio.play();
}

//Select a random image from the list of images and update the HTML to display
//the image.  Image is selected by multiplying a random decimal by the length of 
//the image list, then removing the decimal and using that number to select an 
//index in the array of images names.
function randomizeImage() {
	var imageList = ["dinosaur.png", "duck.png", "icecream.png", "tire.png", 
					"log.png", "sheep.png", "cucumber.png", "camel.png", 
					"phone.png", "volkswagen.png", "toyota.png", "broccoli.png",
					 "horse.png"];
	var image = imageList[Math.floor(Math.random() * imageList.length)];
	var changeImage = document.getElementById("hidden-object");
	changeImage.src = "images/" + image;
}

//Find a random position in the X axis for the location of the hidden target.  
//200 is subtracted from the screenWidth value to prevent the hidden image from 
//appearing partially off screen.  A random number is multiplied by this to 
//determine a value.  Then the "left" style attribute of the hidden images and 
//the target are updated with this value in the HTML.  The +/- 75 aligns 
//the hidden object so it appears in the hidden guy's hands.
function randomizeXPosition() {
	xOffset = Math.floor(Math.random() * (screenWidth - 200));
	var changeXPosition = document.getElementById("target");
	changeXPosition.style.left = xOffset + "px";
	var changeImgXPosition = document.getElementById("hidden-img");
	changeImgXPosition.style.left = (xOffset - 75) + "px";
	var changeHiddenObjectXPosition = document.getElementById("hidden-object");
	changeHiddenObjectXPosition.style.left = (xOffset + 75) + "px";
}

//Find a random position in the Y axis for the location of the hidden target.  
//350 is subtracted from the screenHeight value to prevent the hidden image from 
//appearing partially off screen.  A random number is multiplied by this to 
//determine a value.  Then the "top" style attribute of the hidden images and 
//the target are updated with this value in the HTML.  The +100 value aligns 
//the hidden object so it appears in the hidden guys hands.
function randomizeYPosition() {
	yOffset = Math.floor(Math.random() * (screenHeight - 350));
	var changeYPosition = document.getElementById("target");
	changeYPosition.style.top = yOffset + "px";
	var changeImgYPosition = document.getElementById("hidden-img");
	changeImgYPosition.style.top = yOffset + "px";
	var changeHiddenObjectYPosition = document.getElementById("hidden-object");
	changeHiddenObjectYPosition.style.top = (yOffset + 100) + "px";
}

//Get X and Y coordinates for the mouse position.  If the browser does not 
//support JavaScript events, give the e variable the value of window.event.  
//Then get the x and y position from the event.pageX/pageY DOM properties, or 
//by the event.clientX/clientY properties and by adding the amount of vertical
//or horizontal scroll, which should be none.  This is probably overkill and
//browsers that don't support pageX/Y or Javascript events most likely won't 
//support the HTML audio element.  Once we have posx and posy values, call 
//testPosition function to calculate distance to hidden target.
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

//X and Y distance from target are calculated by subtracting the current mouse
//position from the x and y position of the hidden target, then taking the 
//absolute value of that.  There are 5 "ranges" the distance can fall within,
//with 1 being the furthest from the hidden target, and 5 being the closest.
//Everytime the distance enters a new "range", call the playSound function to 
//play a new sound.
function testPosition(x1, y1) {
	var yDistance = Math.abs(yOffset + 18 - y1);
	var xDistance = Math.abs(xOffset - x1);	
	console.log("Here is the distance from the object if you really want to cheat. " 
		+ "X: " + xDistance + " " + "Y: " + yDistance);
	switch(true) {
		case (yDistance < screenHeight * .03) && (xDistance < screenWidth * .025):
			distanceFromObject = 5;
			break;
		case (yDistance < screenHeight * .1) && (xDistance < screenWidth * .1):
			distanceFromObject = 4;
			break;
		case (yDistance < screenHeight * .2) && (xDistance < screenWidth * .2):
			distanceFromObject = 3;
			break;
		case (yDistance < screenHeight * .3) && (xDistance < screenWidth * .3):
			distanceFromObject = 2;
			break;	
		default:
			distanceFromObject = 1;
	}
	if (soundBeingPlayed != distanceFromObject) {
			playSound();
	}		
}

//Update the source property of the Audio HTML element based on how far the 
//player is from the hidden object.  DistanceFromObject will have an integer 
//value from 1-6.  The sound that is played will correspond to the distance 
//from the object, i.e. if distanceFromObject has a value of 3, sound3 will be
//played.  Then the soundBeingPlayed will be set to the same value as the current
//distanceFromObject, so this function will only be called when the player has
//entered a new "range" closer or further from the object.
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

//Function called when the player clicks on the hidden target.  The variable
//playingGame is set to false to stop the mouse position from being tracked.  
//The hidden guy and object are shown by setting their "display" style attribute
//to "block", and an option to play again is given.
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



