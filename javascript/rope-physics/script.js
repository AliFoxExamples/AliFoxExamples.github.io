const chain1 = document.getElementById("chain1");
const hinge2 = document.getElementById("hinge2");
const chain2 = document.getElementById("chain2");
const hinge3 = document.getElementById("hinge3");
const chain3 = document.getElementById("chain3");
const hinge4 = document.getElementById("hinge4");
const chain4 = document.getElementById("chain4");
const hinge5 = document.getElementById("hinge5");

let chainGroups = {
	objectSuitableWithPhysEngine: true,
	physBox: (document.getElementById("physBox")),
	g1: [chain1, hinge2, {taken: false}],
	g2: [chain2, hinge3, {taken: false}],
	g3: [chain3, hinge4, {taken: false}],
	g4: [chain4, hinge5, {taken: false}]
}

function applyPhysEngineTo (chainGroups, target) {

	if (!chainGroups || !target) {return console.error("Missing arguments!")}
	if (!(chainGroups instanceof Object) || !chainGroups.objectSuitableWithPhysEngine) {return console.error("Invalid input!")}
	if (!(target in chainGroups)) {return console.error("Requested chain group does not exist!")}
	let [chain, hinge, {taken : status}] = chainGroups[target];
	if (status) {return console.error("Requested chain group is already taken!")}
	chainGroups[target][2].taken = true;

	let clickStatus;
	let physBox = chainGroups.physBox;
	function physEngine (event, target, subj) {
		let mClickX = event.clientX;
		let mClickY = event.clientY;
		let mClickXInRange = mClickX - physBox.offsetLeft;
		let mClickYInRange = mClickY - physBox.offsetTop;
		let trgLeft = target.offsetLeft;
		let trgTop = target.offsetTop;
		let  a, b, c, aDeg, bDeg, aRad, bRad, cotan, elDeg;

		if (clickStatus == true) {

			// Определение координат клика мыши относительно "коробки".
			mClickXInRange = event.clientX + window.scrollX - physBox.offsetLeft;
			mClickYInRange = event.clientY + window.scrollY - physBox.offsetTop;

			// Физика рычага.
			// Определение координат вешин прямоугольного треугольника для дальнейшего определения угла направления указателя.
			if (mClickXInRange < trgLeft) {
				a = ((trgLeft - mClickXInRange)+2) * -1; 
			}
			else if (mClickXInRange > trgLeft) {
				a =  mClickXInRange - trgLeft - 2; 
			}
			else { a = 0 }
			if (mClickYInRange > trgTop) {
				b = mClickYInRange - trgTop - 2;
			}
			else if (mClickYInRange < trgTop) {
				b = ((trgTop - mClickYInRange) + 2) * -1;
			}
			else { b = 0 }
			c = Math.sqrt(a*a + b*b);

			// Определение угла поворота указателя.
			cotan = Math.acos(a/c);
			if (mClickYInRange < trgTop) {						// Изменение знака угла указателя относительно положения курсора относительно оси указателя.
				cotan = cotan * -1;
			}
			aDeg = (cotan)/Math.PI * 180;
			
			// Применение значений угла к указателю.
			target.style.transform = `rotate(${aDeg}deg)`;

			// Физика шарнира.
			// Переопределение значения угла указателя в формат "360".
			elDeg = aDeg;
			if (elDeg < 0) {
				elDeg = elDeg + 360;
			}

			// Определение углов катетов прямоугольного треугольника.
			if (aDeg <= 90 && aDeg >= 0) {
				aDeg = (90 - aDeg);
			}
			else if (aDeg >= 90 && aDeg <= 180) {
				aDeg = (aDeg - 90);
			}
			else if (aDeg <= 0 && aDeg >= - 90) {
				aDeg = (-90 - aDeg) * -1;
			}
			else {
				aDeg = (aDeg + 90) * -1;
			}
			bDeg = 90 - aDeg;

			// Перевод значений углов катетов в радианы.
			aRad = aDeg * Math.PI / 180;
			bRad = bDeg * Math.PI / 180;

			// Определения длин катетов по радиусу "100" (медианы) и углам катетов в радианах.
			a = Math.sin(aRad) * target.offsetWidth;
			b = Math.sin(bRad) * target.offsetWidth;

			// Определение знака длины катетов.
			if (elDeg > 90 && elDeg < 270) { 
				a = a * -1;
			}
			if (elDeg > 180) {
				b = b * -1;
			}

			// Ограничение перемещения шарнира по радиусу "100".		
			subj.style.left = trgLeft + a + "px";
			subj.style.top = trgTop + b + 3 + "px"; // С добавлением ширины рычага "3px";

			// Обновление значений координат мыши.
			mClickX = event.clientX;
			mClickY = event.clientY;
		}
	}
	physBox.addEventListener("mousedown", (event) => {clickStatus = true; physEngine(event, chain, hinge)})
	document.addEventListener("mousemove", (event) => {physEngine(event, chain, hinge)})
	window.addEventListener("mouseup", (event) => {clickStatus = false});
	document.addEventListener("mouseup", (event) => {clickStatus = false});

}