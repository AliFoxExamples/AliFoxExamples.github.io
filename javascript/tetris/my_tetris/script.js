var parentA = document.getElementById("parent");
var rangeBox = document.getElementById("box");
var button = document.getElementById("button");

var gameHasStarted = false;

var x = 8;
var y = 1;
var currentPos = "cell" + y + "_" + x;


function idle () {

	x = 8;
	y = 1;
	var startCell = document.getElementById("cell1_8");

	startCell.style.backgroundColor = "#4d9900";
}


var previousCell;
var currentCell;


function start () {

	gameHasStarted = true;

	button.onclick = "";


	function movingDown () {

		if (y == 19)	{
			clearInterval(moving);
		}

		previousCell = document.getElementById(currentPos);

		previousCell.style.backgroundColor = "transparent";

		y++;

		currentPos = "cell" + y + "_" + x;

		currentCell = document.getElementById(currentPos);

		currentCell.style.backgroundColor = "#4d9900";

	}

	let moving = setInterval(movingDown, 1000)

		
}

function movingLeft () {

	if (x != 1 && gameHasStarted == true) {

		previousCell = document.getElementById(currentPos);

		previousCell.style.backgroundColor = "transparent";

		x--;

		currentPos = "cell" + y + "_" + x;

		currentCell = document.getElementById(currentPos);

		currentCell.style.backgroundColor = "#4d9900";

	}
}

function movingRight () {

	if (x != 15 && gameHasStarted == true) {

		previousCell = document.getElementById(currentPos);

		previousCell.style.backgroundColor = "transparent";

		x++;

		currentPos = "cell" + y + "_" + x;

		currentCell = document.getElementById(currentPos);

		currentCell.style.backgroundColor = "#4d9900";

	}
}



