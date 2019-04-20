var button = document.getElementById("button"); // Ползунок.
var rang = document.getElementById("rang"); // Поле движения ползунка.
var box0 = document.getElementById("box0");
var box = document.getElementById("box1"); // Табло вывода 1.
var box2 = document.getElementById("box2"); // Табло вывода 2.
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var buttonLeftOffset; // Число левого отступа ползунка от контейнера.



// Основной скрипт:


rang.addEventListener('mousedown', function(event) {

	button.style.backgroundColor = "#006400";
	rang.style.backgroundColor = "#80755c";
	buttonLeftOffset = button.offsetLeft;
	rangLeftOffset = rang.offsetLeft;
	positionOnClick = event.clientX;
	calculatedPosition = (positionOnClick - rangLeftOffset) - 10;
	button.style.left = calculatedPosition + "px";
	clickStatus = true;

	document.addEventListener('mousemove', function(event) {






		if (clickStatus == true) {		

			dynamicPosition = event.clientX; // Позиция перемещенного курсора мыши по оси X, после клика.
			if (dynamicPosition < 0) {
				dynamicPosition = 0;
			}

			if (positionOnClick > dynamicPosition ) {

				calculatedPosition = calculatedPosition + ((1 - (positionOnClick - dynamicPosition)) - 1); // Обратить число позиции курсора мыши в отрицательное, если оно левее позиции курсора мыши в момент клика.
				

				if (calculatedPosition < -1) {  // Ограничение перемещения влево.
					calculatedPosition = -1;
					//dynamicPosition = positionOnClick;

				}
			}

			else {

				calculatedPosition = calculatedPosition + (dynamicPosition - positionOnClick);


				if (calculatedPosition > 184) {  // Ограничение перемещения вправо.
					calculatedPosition = 184;
					//dynamicPosition = positionOnClick;
				}
			}







			positionOnClick = dynamicPosition;
			button.style.left = calculatedPosition + "px";
			box.innerHTML = "Calculated Mouse Position : " + calculatedPosition;
			box2.innerHTML = "Left Offset : " + button.offsetLeft;
			box3.innerHTML = "Mouse x : " + event.clientX;
			box4.innerHTML = "Position on Click : " + positionOnClick;
			box5.innerHTML = "Dynamic Position : " + dynamicPosition;





			volume = calculatedPosition;
			if (volume < 0) {
				volume = 0;
			}
			volume = Math.floor(100 * (volume / 184));
			box0.innerHTML = "Volume: " + volume;
		}

	});

	window.addEventListener('mouseup', function(event) {
	button.style.backgroundColor = "#3CB371";
	rang.style.backgroundColor = "#b0a792";
	clickStatus = false;

	});

});




















































/*
button.addEventListener('mousedown', function(event) {

	button.style.backgroundColor = "#006400";
	rang.style.backgroundColor = "#80755c";
	positionOnClick = event.clientX;  // Позиция курсора мыши по оси X, в момент клика.
	buttonLeftOffset = button.offsetLeft;  // Текущий левый отступ ползунка от контейнера.
	var clickStatus = true;

	document.addEventListener('mousemove', function(event) {

		if (clickStatus == true) {		

			dynamicPosition = event.clientX; // Позиция перемещенного курсора мыши по оси X, после клика.

			if (positionOnClick > dynamicPosition ) {

				calculatedPosition = (1 - (positionOnClick - dynamicPosition)) - 1; // Обратить число позиции курсора мыши в отрицательное, если оно левее позиции курсора мыши в момент клика.
				calculatedPosition = buttonLeftOffset + calculatedPosition;

				if (calculatedPosition < -1) {  // Ограничение перемещения влево.
					calculatedPosition = -1;
				}
			}

			else {

				calculatedPosition = dynamicPosition - positionOnClick;
				calculatedPosition = buttonLeftOffset + calculatedPosition;

				if (calculatedPosition > 184) {  // Ограничение перемещения вправо.
					calculatedPosition = 184;
				}
			}

			button.style.left = calculatedPosition + "px";
			box.innerHTML = "Calculated Mouse Position : " + calculatedPosition;
			box2.innerHTML = "Left Offset : " + button.offsetLeft;

		}
	});

	window.addEventListener('mouseup', function(event) {
		button.style.backgroundColor = "#3CB371";
		rang.style.backgroundColor = "#b0a792";
		clickStatus = false;
	});

});

*/


