var handleMove = document.getElementById("handleMove");															// Определение движущегося блока ручки громкости.
var handleOffset = document.getElementById("handleOffset");														// Определение контейнера движущегося блока ручки громкости.
var handleClick = document.getElementById("handleClick");														// Определение кликабельного участка ручки громкости.
var volumeBox = document.getElementById("volumeBox");															// Табло вывода результата значения громкости.
var calculatedHandlePositionBox = document.getElementById("calculatedHandlePositionBox");						// Табло вывода значения вычисленной позиции курсора.
var topOffsetOfHandleBox = document.getElementById("topOffsetOfHandleBox");										// Табло вывода значения верхнего отступа контейнера движущегося блока ручки громкости.
var yCoordinateOfMouseBox = document.getElementById("yCoordinateOfMouseBox");									// Табло вывода значения координаты "y" курсора мыши на экране.
var positionOnClickBox = document.getElementById("positionOnClickBox");											// Табло вывода значения координаты "y" курсора мыши на экране в момент клика.
var dynamicPositionOfMouseBox = document.getElementById("dynamicPositionOfMouseBox");							// Табло вывода динамического значения координаты "y" курсора мыши на экране после клика.
var topOffsetOfHandleMoveBox = document.getElementById("topOffsetOfHandleMoveBox");								// Табло вывода значения верхнего отступа движущегося блока ручки громкости.
var devBox = document.getElementById("dev"); 																	// Блок табло вывода значений.
var minValueOfRange = 0;																						// Минимальное значение длины поля движения ползунка громкости.
var maxValueOfRange = 80;																						// Максимальное значение длины поля движения ползунка громкости.
var calculatedHandlePosition = handleMove.offsetTop;															// Начальное определение значений.
var calculatedHandlePreviousPosition = handleMove.offsetTop;													// Начальное определение значений.
var volumePersentOfProgress = 0;																				// Начальное определение значений.
var videoAutoplay = document.getElementById("video1");															// Определение видео.
var progressFullNum = 1;																						// Начальное определение значений (переменная для "flex-shrink").
var progressEmptyNum = 1000;																					// Начальное определение значений (переменная для "flex-shrink").
var progressEmpty = document.getElementById("empty");															// Начальное определение значений ("flex-shrink").
var progressFull = document.getElementById("full");																// Начальное определение значений ("flex-shrink").
var shrinkStatus = true;																						// Переключатель "сжимателя".
videoAutoplay.volume = 0;																						// Начальное заглушение видео.

handleClick.addEventListener('mousedown', function(event) {														// Основная функция.

	videoAutoplay.muted = false;																									// Включение звука видео.

	clickStatus = true;

	handleClick.style.backgroundColor = "#006400";

	handleMoveOffset = handleMove.offsetTop;

	mousePositionOnClick = event.clientY;

	document.addEventListener('mousemove', function(event) {

		if (clickStatus == true) {																									// Определение статуса клика мыши.

			dynamicPositionOfMouse = event.clientY;																					// Позиция перемещенного курсора мыши по оси "Y", после клика.

			if (mousePositionOnClick < dynamicPositionOfMouse) {

				calculatedHandlePosition = (dynamicPositionOfMouse - mousePositionOnClick) + handleMoveOffset;


				if (calculatedHandlePosition > maxValueOfRange) {																	// Ограничение перемещения ползунка вниз.
					calculatedHandlePosition = maxValueOfRange;
				}
			}

			else {

				calculatedHandlePosition = ((1 - (mousePositionOnClick - dynamicPositionOfMouse)) - 1) + handleMoveOffset;			// Обращение числа позиции курсора мыши в отрицательное, если оно выше позиции курсора мыши в момент клика.
				

				if (calculatedHandlePosition < minValueOfRange) { 																	// Ограничение перемещения ползунка вверх.
					calculatedHandlePosition = minValueOfRange;

				}
			}

			handleMove.style.top = calculatedHandlePosition + "px";																	// Вывод значений.
			calculatedHandlePositionBox.innerHTML = "Calculated Handle Position : " + calculatedHandlePosition;
			topOffsetOfHandleBox.innerHTML = "Top Offset of Handle : " + handleOffset.offsetTop;
			topOffsetOfHandleMoveBox.innerHTML = "Top Offset of Handle Move : " + handleMove.offsetTop;
			yCoordinateOfMouseBox.innerHTML = "Mouse y : " + event.clientY;
			positionOnClickBox.innerHTML = "Position on Click : " + mousePositionOnClick;
			dynamicPositionOfMouseBox.innerHTML = "Dynamic Position of Mouse: " + dynamicPositionOfMouse;

			if (calculatedHandlePreviousPosition < calculatedHandlePosition) {														// Определение направления нажатия ручки (вниз).
				
				if (volumePersentOfProgress < 100) {																				// Блок процесса накачивания.

					volumePersentOfProgress = volumePersentOfProgress + 1;
					volumeBox.innerHTML = Math.floor(volumePersentOfProgress);

					progressFullNum = (-1 * ((volumePersentOfProgress / 99 * 999) - 999));
					progressEmptyNum = (volumePersentOfProgress / 100 * 1000);
					progressFull.style = "flex-shrink: " + progressFullNum;
					progressEmpty.style = "flex-shrink: " + progressEmptyNum;


					videoAutoplay.volume = ((1 / 100) * Math.floor(volumePersentOfProgress));
				}

			}

			calculatedHandlePreviousPosition = calculatedHandlePosition;

			if (volumePersentOfProgress > 0) {																						// Переключение переключателя "сжимателя".
				if (shrinkStatus == true) {
					progressFuncStart();
					shrinkStatus = false;
				}
				
			}

		}		

	});

	topOffsetOfHandleBox.innerHTML = "Top Offset of Handle : " + handleOffset.offsetTop;											// Вывод значений.
	topOffsetOfHandleMoveBox.innerHTML = "Top Offset of Handle Move : " + handleMove.offsetTop;
	yCoordinateOfMouseBox.innerHTML = "Mouse y : " + event.clientY;
	positionOnClickBox.innerHTML = "Position on Click : " + mousePositionOnClick;

	window.addEventListener('mouseup', function(event) {																			// Прекрашение выполнения функции после отжатия кнопки мыши.
		handleClick.style.backgroundColor = "#707070";

		yCoordinateOfMouseBox.innerHTML = "Mouse y : -";
		clickStatus = false;
	});

});

var hideShowStatus = true;																											// Показать - скрыть блок табло вывода значений.

function hideShow () {

	if (hideShowStatus == false) {
		devBox.style.display = "none";
		hideShowStatus = true;
		return;
	}

	if (hideShowStatus == true) {
		devBox.style.display = "block";
		hideShowStatus = false;
		return;
	}
};

var progressFunc = function () {																									// Функция сжимания/убавления.

	if (volumePersentOfProgress == 0) { 
		clearInterval(progressInterval);
		shrinkStatus = true;
	}

	volumeBox.innerHTML = Math.floor(volumePersentOfProgress);
	volumePersentOfProgress = volumePersentOfProgress - 1;

	if (volumePersentOfProgress <= 0) {
		volumePersentOfProgress = 0;
	}


	progressFullNum = (-1 * ((volumePersentOfProgress / 99 * 999) - 999));
	progressEmptyNum = (volumePersentOfProgress / 100 * 1000);
	progressFull.style = "flex-shrink: " + progressFullNum;
	progressEmpty.style = "flex-shrink: " + progressEmptyNum;
	videoAutoplay.volume = ((1 / 100) * Math.floor(volumePersentOfProgress));

}


var progressFuncStart = function () {																								// Объявление интервала убавления.
	progressInterval = setInterval(progressFunc, 250);
}
