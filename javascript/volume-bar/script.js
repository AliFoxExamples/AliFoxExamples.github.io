var button = document.getElementById("button"); // Ползунок.
var rang = document.getElementById("rang"); // Поле движения ползунка.
var box = document.getElementById("box1"); // Табло вывода 1.
var box2 = document.getElementById("box2"); // Табло вывода 2.
var buttonLeftOffset; // Число левого отступа ползунка от контейнера.



// Основной скрипт:

button.addEventListener('mousedown', function(event) {

	button.style.backgroundColor = "red";
	

	positionOnClick = event.clientX;  // Позиция курсора мыши по оси X, в момент клика.
	buttonLeftOffset = button.offsetLeft;  // Текущий левый отступ ползунка от контейнера.

	var statusM = 0;


	document.addEventListener('mousemove', function(event) {

		function readd () {		

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

		window.addEventListener('mouseup', function(event) {
			statusM = 1;
			button.style.backgroundColor = "green";
		});	

		if (statusM == 0) {
			readd ();
		}
	});
});
	
