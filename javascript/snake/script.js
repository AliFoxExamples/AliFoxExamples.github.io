let snakeHeadColor = "#474842";
let snakeBodyColor = "black";
let backgroundColor = "#eeffb3";

let table = document.getElementsByTagName("table")[0].childNodes[1].childNodes;
let rows = [];

for (let i = 0; i < table.length; i++) {
	if ( (i & 1) !== 1 ) {
		rows[i/2] = table[i];
	}
}

function draw(head) {
	for (let i of snake.body) {
		rows[i.y-1].childNodes[i.x+i.x-1].style.backgroundColor = snakeBodyColor;		
	}
	rows[head.y-1].childNodes[head.x+head.x-1].style.backgroundColor = snakeHeadColor;
}

function clear(x,y) {
	rows[y-1].childNodes[x+x-1].style.backgroundColor = backgroundColor;
}

let snake = {
	addCell(num = 1){
		for (let i = num; i>0; i--) {
			let snakeSize = this.body.length;
			this.body[snakeSize] = { x: this.body[snakeSize-1].x, y: this.body[snakeSize-1].y}
		}
	},
	body: []
}

function gameOver() {
	let switcher = false;	// Переключатель моргания.
	let deathColor;
	let deathBlinkInterval = setInterval(()=>{
		if (switcher) {
			switcher = false;
			deathColor = "black";
		}
		else {
			switcher = true;
			deathColor = "red";
		}
		for (let i of snake.body) {
			rows[i.y-1].childNodes[i.x+i.x-1].style.backgroundColor = deathColor;
		}
	}, 300);
	let deathBlinkIntervalBreaker = setTimeout(()=>{
		clearInterval(deathBlinkInterval);
		for (let i of snake.body) {
			rows[i.y-1].childNodes[i.x+i.x-1].style.backgroundColor = backgroundColor;
		}
		snake.body = [];
	}, 4000);
	

}

function moveAnimation(speed){
	snake.body[0] = { x:25, y:25, head:true};
	let activeAxis = "y";
	let incDecNum = 1;
	let eventBreaker = false;	// Переключатель для предотвращения изменения направления ("direction") до того как будет выполнен цикл отрисовки.

	window.onkeydown = directionDefiner;
	function directionDefiner(e) {
		if (eventBreaker) return;
		if ((( activeAxis == "y" && incDecNum == 1 ) && e.keyCode == 38)	||
			(( activeAxis == "y" && incDecNum == -1 ) && e.keyCode == 40)	||
			(( activeAxis == "x" && incDecNum == -1 ) && e.keyCode == 39)	||
			(( activeAxis == "x" && incDecNum == 1 ) && e.keyCode == 37)) {
			return;
		}

		switch(e.keyCode){
			case 38:
				activeAxis = "y";
				incDecNum = -1;
				break;
			case 37:
				activeAxis = "x";
				incDecNum = -1;
				break;
			case 40:
				activeAxis = "y";
				incDecNum = 1;
				break;
			case 39:
				activeAxis = "x";
				incDecNum = 1;
				break;
		}

		eventBreaker = true;
	}

	function collisionDetecter(x,y){	
		for (let i of snake.body) {
			if (x == i.x && y == i.y) {
				clearInterval(moveInteval);
				gameOver();
			}
		}
	}

	let moveInteval = setInterval(()=>{

		let target = activeAxis == "y"? "y" : "x";
		let collision = activeAxis == "y"? collisionDetecter(snake.body[0].x, snake.body[0].y + incDecNum) : collisionDetecter(snake.body[0].x + incDecNum, snake.body[0].y);
		if (collision) return;

		clear(snake.body[snake.body.length-1].x, snake.body[snake.body.length-1].y);

		for (let i = snake.body.length-1; i > 0; i--) {
			snake.body[i] = {x: snake.body[i-1].x , y: snake.body[i-1].y };
		}

		if(snake.body[0][target] + incDecNum > rows.length ||snake.body[0][target] + incDecNum < 1) {
			snake.body[0][target] -= rows.length * incDecNum;
		}

		snake.body[0][target] += incDecNum;

		draw(snake.body[0]);

		eventBreaker = false;
	}, speed);
}

