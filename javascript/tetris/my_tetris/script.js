var parentA = document.getElementById("parent");
var rangeBox = document.getElementById("box");
var button = document.getElementById("button");
var hiddenCells = document.getElementsByClassName("hidden");

var gameHasStarted = false;

var x = 5;
var y = 1;
var currentPos = "cell" + y + "_" + x;


function idle () {

	x = 5;
	y = 1;
	var startCell = document.getElementById("cell1_5");

	startCell.style.backgroundColor = "#4d9900";
}


var previousCell;
var currentCell;


function start () {

	gameHasStarted = true;

	button.onclick = "";


	function movingDown () {

		if (y == 22)	{
			clearInterval(moving);
		}

		else {

			previousCell = document.getElementById(currentPos);

			previousCell.style.backgroundColor = "#eeffb3";

			y++;

			for (var i = 0; i < hiddenCells.length; i++)
	    		hiddenCells[i].style.backgroundColor = "transparent";

			currentPos = "cell" + y + "_" + x;

			currentCell = document.getElementById(currentPos);

			currentCell.style.backgroundColor = "#4d9900";
		}



	}

	let moving = setInterval(movingDown, 1000)

		
}

function movingLeft () {

	if (x != 1 && gameHasStarted == true) {

		previousCell = document.getElementById(currentPos);

		previousCell.style.backgroundColor = "#eeffb3";

		x--;

		currentPos = "cell" + y + "_" + x;

		currentCell = document.getElementById(currentPos);

		currentCell.style.backgroundColor = "#4d9900";

	}
}

function movingRight () {

	if (x != 10 && gameHasStarted == true) {

		previousCell = document.getElementById(currentPos);

		previousCell.style.backgroundColor = "#eeffb3";

		x++;

		currentPos = "cell" + y + "_" + x;

		currentCell = document.getElementById(currentPos);

		currentCell.style.backgroundColor = "#4d9900";

	}
}



