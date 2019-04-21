var button = document.getElementById("button");				// Определение ползунока громкости.
var range = document.getElementById("range");				// Определение поля движения ползунка громкости.

var volumeBox = document.getElementById("volumeBox");				// Табло вывода результата значения громкости.
var calculatedButtonPositionBox = document.getElementById("calculatedButtonPositionBox");				// Табло вывода значения вычисленной позиции курсора.
var leftOffsetOfButtonBox = document.getElementById("leftOffsetOfButtonBox");				// Табло вывода значения левого отступа кнопки громкости от контейнера.
var xCoordinateOfMouseBox = document.getElementById("xCoordinateOfMouseBox");				// Табло вывода значения координаты "x" курсора мыши на экране.
var positionOnClickBox = document.getElementById("positionOnClickBox");				// Табло вывода значения координаты "x" курсора мыши на экране в момент клика.
var dynamicPositionOfMouseBox = document.getElementById("dynamicPositionOfMouseBox");				// Табло вывода динамического значения координаты "x" курсора мыши на экране после клика.
var mouseClickPositionInRangeBox = document.getElementById("mouseClickPositionInRangeBox");				// Табло вывода значения позиции курсора мыши в поле движения ползунка громкости.

var leftOffsetOfRangeBox = document.getElementById("leftOffsetOfRangeBox");				// Табло вывода значения левого отступа поля движения ползунка громкости.

var devBox = document.getElementById("dev"); // Блок табло вывода значений.


var leftOffsetOfButton;				// Значение левого отступа ползунка от контейнера.

var minValueOfRange = 0;				// Минимальное значение длины поля движения ползунка громкости.
var maxValueOfRange = 183;				// Максимальное значение длины поля движения ползунка громкости.


range.addEventListener('mousedown', function(event) {				// Основная функция.

	clickStatus = true;

	button.style.backgroundColor = "#006400";
	range.style.backgroundColor = "#80755c";
	leftOffsetOfButton = button.offsetLeft;
	leftOffsetOfRange = range.offsetLeft;
	mousePositionOnClick = event.clientX;
	mouseClickPositionInRange = (mousePositionOnClick - leftOffsetOfRange) - 10;


	if (mouseClickPositionInRange < minValueOfRange) {				// Ограничение перемещения ползунка влево.
		mouseClickPositionInRange = minValueOfRange;
	}

	if (mouseClickPositionInRange > maxValueOfRange) {				// Ограничение перемещения ползунка вправо.
		mouseClickPositionInRange = maxValueOfRange;
	}


	button.style.left = mouseClickPositionInRange + "px";
	

	document.addEventListener('mousemove', function(event) {

		if (clickStatus == true) {				// Определение статуса клика мыши.

			dynamicPositionOfMouse = event.clientX;				// Позиция перемещенного курсора мыши по оси "X", после клика.

			if (dynamicPositionOfMouse < minValueOfRange) {				// Ограничение перемещения ползунка влево.
				dynamicPositionOfMouse = minValueOfRange;
			}

			if (mousePositionOnClick < dynamicPositionOfMouse) {

				calculatedButtonPosition = mouseClickPositionInRange + (dynamicPositionOfMouse - mousePositionOnClick);


				if (calculatedButtonPosition > maxValueOfRange) {				// Ограничение перемещения ползунка вправо.
					calculatedButtonPosition = maxValueOfRange;
				}
			}

			else {

				calculatedButtonPosition = mouseClickPositionInRange + ((1 - (mousePositionOnClick - dynamicPositionOfMouse)) - 1);				// Обращение числа позиции курсора мыши в отрицательное, если оно левее позиции курсора мыши в момент клика.
				

				if (calculatedButtonPosition < minValueOfRange) {  // Ограничение перемещения влево.
					calculatedButtonPosition = minValueOfRange;

				}
			}

			button.style.left = calculatedButtonPosition + "px";

			volume = Math.floor(100 * (calculatedButtonPosition / maxValueOfRange));

			// Вывод значений.

			volumeBox.innerHTML = "Volume: " + volume;
			calculatedButtonPositionBox.innerHTML = "Calculated Button Position : " + calculatedButtonPosition;
			leftOffsetOfButtonBox.innerHTML = "Left Offset of Button : " + button.offsetLeft;
			xCoordinateOfMouseBox.innerHTML = "Mouse x : " + event.clientX;
			positionOnClickBox.innerHTML = "Position on Click : " + mousePositionOnClick;
			dynamicPositionOfMouseBox.innerHTML = "Dynamic Position of Mouse: " + dynamicPositionOfMouse;
			mouseClickPositionInRangeBox.innerHTML = "Mouse Click Position in Range : " + mouseClickPositionInRange;
			
		}
	});

	volume = Math.floor(100 * (mouseClickPositionInRange / (maxValueOfRange)));

	// Вывод значений.

	volumeBox.innerHTML = "Volume: " + volume;
	calculatedButtonPositionBox.innerHTML = "Calculated Button Position : -";
	leftOffsetOfButtonBox.innerHTML = "Left Offset of Button : " + button.offsetLeft;
	xCoordinateOfMouseBox.innerHTML = "Mouse x : " + event.clientX;
	positionOnClickBox.innerHTML = "Position on Click : " + mousePositionOnClick;
	dynamicPositionOfMouseBox.innerHTML = "Dynamic Position of Mouse: -";
	mouseClickPositionInRangeBox.innerHTML = "Mouse Click Position in Range : " + mouseClickPositionInRange;
	leftOffsetOfRangeBox.innerHTML = "Left Offset Of Range Box : " + leftOffsetOfRange;

	window.addEventListener('mouseup', function(event) {				// Прекрашение выполнения функции после отжатия кнопки мыши.
		button.style.backgroundColor = "#3CB371";
		range.style.backgroundColor = "#b0a792";
		clickStatus = false;
	});
});





// Показать - скрыть блок табло вывода значений.

var hideShowStatus = true;

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