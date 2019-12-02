var ball = document.getElementById("ball");

var ballTopOffset = ball.offsetTop;

var ballAccelerationBox = document.getElementById("ballAcceleration");
var ballTopOffsetBox = document.getElementById("ballTopOffset");


ballAcceleration = 0;

var gravity = function() {

	ballTopOffset = ball.offsetTop;

	if (ballTopOffset < 747) {

		ballAcceleration = ballAcceleration + 0.1;

		ballTopOffset = Math.floor(ballTopOffset + ballAcceleration);

		if (ballTopOffset > 747) {
			ballTopOffset = 747;
		}

	}

	/*

	else {

		ballAcceleration = -ballAcceleration + 0.1;

		ballTopOffset = Math.floor(ballTopOffset + ballAcceleration);

		
	}*/

	if (ballTopOffset <= 0) {
			ballTopOffset = 0;
		}

	ball.style = "top: " + ballTopOffset + "px";

	ballAccelerationBox.innerHTML = "Ball Acceleration = " + ballAcceleration;
	ballTopOffsetBox.innerHTML = "Ball Top Offset = " + ballTopOffset;
	
}

var gravityIntervalStart = function () {
	gravityInterval = setInterval(gravity, 10);
}



var startButton = document.getElementById("start");