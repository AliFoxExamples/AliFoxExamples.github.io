const cl = console.log;

// Конвертировать радианы в градусы.
function convertRadToDeg(rad) {
  return (rad / Math.PI) * 180;
}

// Конвертировать градусы в радианы.
function convertDegToRad(deg) {
  return (deg * Math.PI) / 180;
}

const chain1 = document.getElementById("chain1");
const hinge2 = document.getElementById("hinge2");
const chain2 = document.getElementById("chain2");
const hinge3 = document.getElementById("hinge3");
const chain3 = document.getElementById("chain3");
const hinge4 = document.getElementById("hinge4");
const chain4 = document.getElementById("chain4");
const hinge5 = document.getElementById("hinge5");

let chainsGroup = {
  objectSuitableWithPhysEngine: true,
  physBox: document.getElementById("physBox"),
  g1: [chain1, hinge2, { taken: false }],
  g2: [chain2, hinge3, { taken: false }],
  g3: [chain3, hinge4, { taken: false }],
  g4: [chain4, hinge5, { taken: false }],
};

function applyPhysEngineTo(chainsGroupObject, chainsGroupObjectTarget) {
  if (!chainsGroupObject || !chainsGroupObjectTarget) {
    return console.error("Missing arguments!");
  }
  if (!(chainsGroupObject instanceof Object) || !chainsGroupObject.objectSuitableWithPhysEngine) {
    return console.error("Invalid input!");
  }
  if (!(chainsGroupObjectTarget in chainsGroupObject)) {
    return console.error("Requested chain group does not exist!");
  }
  let [chain, hinge, { taken: status }] = chainsGroupObject[chainsGroupObjectTarget];
  if (status) {
    return console.error("Requested chain group is already taken!");
  }
  chainsGroupObject[chainsGroupObjectTarget][2].taken = true;

  let clickStatus;
  let physBox = chainsGroupObject.physBox;
  function physEngine(event, targetChain, targetHinge) {
    let mClickX = event.clientX;
    let mClickY = event.clientY;
    let mClickXInRange = mClickX - physBox.offsetLeft;
    let mClickYInRange = mClickY - physBox.offsetTop;
    let trgLeft = targetChain.offsetLeft;
    let trgTop = targetChain.offsetTop;
    let a, b, hypot, aDeg, bDeg, aRad, bRad, elDeg;

    if (clickStatus == true) {
      // Определение координат клика мыши относительно "коробки".
      mClickXInRange = event.clientX + window.scrollX - physBox.offsetLeft;
      mClickYInRange = event.clientY + window.scrollY - physBox.offsetTop;

      // Физика рычага.
      // Определение координат вешин прямоугольного треугольника для дальнейшего определения угла направления рычага.
      // Катет "а".
      // "+-2" - подгон под ширину границ по 2 пиеселя.
      if (mClickXInRange < trgLeft) {
        a = (trgLeft - mClickXInRange + 2) * -1;
      } else if (mClickXInRange > trgLeft) {
        a = mClickXInRange - trgLeft - 2;
      } else {
        a = 0;
      }

      // Катет "б".
      if (mClickYInRange > trgTop) {
        b = mClickYInRange - trgTop - 2;
      } else if (mClickYInRange < trgTop) {
        b = (trgTop - mClickYInRange + 2) * -1;
      } else {
        b = 0;
      }

      // Гипотенуза.
      hypot = Math.hypot(a, b);

      const sine = b / hypot; // Определение синуса угла поворота рычага.
      aRad = Math.asin(sine); // Определение угла поворота рычага в радианах через арксинус.

      aDeg = convertRadToDeg(aRad); // Перевод радианов в градусы.
      aDeg = mClickXInRange < trgLeft ? 180 - aDeg : aDeg; // Форматирование угла рычага в зависимости от того, в какой половине находится курсор относительно вертикальной оси.

      // Применение значений угла к рычагу.
      targetChain.style.transform = `rotate(${aDeg}deg)`;

      //--------------------------------- ОСТ

      // Физика шарнира.
      // Переопределение значения угла рычага в формат "360".

      elDeg = aDeg < 0 ? aDeg + 360 : aDeg;
      cl(elDeg, aDeg);

      // Определение углов катетов прямоугольного треугольника.
      if (aDeg <= 90 && aDeg >= 0) {
        aDeg = 90 - aDeg;
      } else if (aDeg >= 90 && aDeg <= 180) {
        aDeg = aDeg - 90;
      } else if (aDeg <= 0 && aDeg >= -90) {
        aDeg = (-90 - aDeg) * -1;
      } else {
        aDeg = (aDeg + 90) * -1;
      }
      bDeg = 90 - aDeg;
      cl("2", elDeg, aDeg, bDeg);

      // Перевод значений углов катетов в радианы.
      aRad = convertDegToRad(aDeg);
      bRad = convertDegToRad(bDeg);

      // Определения длин катетов по радиусу "100" (медианы) и углам катетов в радианах.
      a = Math.sin(aRad) * targetChain.offsetWidth;
      b = Math.sin(bRad) * targetChain.offsetWidth;

      // Определение знака длины катетов.
      if (elDeg > 90 && elDeg < 270) {
        a = a * -1;
      }
      if (elDeg > 180) {
        b = b * -1;
      }

      // Ограничение перемещения шарнира по радиусу "100".
      targetHinge.style.left = trgLeft + a + "px";
      targetHinge.style.top = trgTop + b + 3 + "px"; // С добавлением ширины рычага "3px";

      // Обновление значений координат мыши.
      mClickX = event.clientX;
      mClickY = event.clientY;

      //---------------------------------
      //---------------------------------
      //---------------------------------
      //---------------------------------

      // // Определение угла поворота рычага.
      // cotan = Math.acos(a / hypot);
      // cl("1", a / hypot, cotan);

      // cotan = mClickYInRange < trgTop ? -cotan : cotan; // Изменение знака угла рычага относительно положения курсора относительно оси рычага.

      // aDeg = (cotan / Math.PI) * 180;
      // cl("2", a, b, hypot, cotan, aDeg);

      // // Применение значений угла к указателю.
      // targetChain.style.transform = `rotate(${aDeg}deg)`;

      // // Физика шарнира.
      // // Переопределение значения угла рычага в формат "360".

      // elDeg = aDeg < 0 ? aDeg + 360 : aDeg;

      // // Определение углов катетов прямоугольного треугольника.
      // if (aDeg <= 90 && aDeg >= 0) {
      //   aDeg = 90 - aDeg;
      // } else if (aDeg >= 90 && aDeg <= 180) {
      //   aDeg = aDeg - 90;
      // } else if (aDeg <= 0 && aDeg >= -90) {
      //   aDeg = (-90 - aDeg) * -1;
      // } else {
      //   aDeg = (aDeg + 90) * -1;
      // }
      // bDeg = 90 - aDeg;

      // // Перевод значений углов катетов в радианы.
      // aRad = (aDeg * Math.PI) / 180;
      // bRad = (bDeg * Math.PI) / 180;

      // // Определения длин катетов по радиусу "100" (медианы) и углам катетов в радианах.
      // a = Math.sin(aRad) * targetChain.offsetWidth;
      // b = Math.sin(bRad) * targetChain.offsetWidth;

      // // Определение знака длины катетов.
      // if (elDeg > 90 && elDeg < 270) {
      //   a = a * -1;
      // }
      // if (elDeg > 180) {
      //   b = b * -1;
      // }

      // // Ограничение перемещения шарнира по радиусу "100".
      // targetHinge.style.left = trgLeft + a + "px";
      // targetHinge.style.top = trgTop + b + 3 + "px"; // С добавлением ширины рычага "3px";

      // // Обновление значений координат мыши.
      // mClickX = event.clientX;
      // mClickY = event.clientY;
    }
  }
  physBox.addEventListener("mousedown", (event) => {
    clickStatus = true;
    physEngine(event, chain, hinge);
  });
  document.addEventListener("mousemove", (event) => {
    physEngine(event, chain, hinge);
  });
  window.addEventListener("mouseup", (event) => {
    clickStatus = false;
  });
  document.addEventListener("mouseup", (event) => {
    clickStatus = false;
  });
}

applyPhysEngineTo(chainsGroup, "g4");

//===============================================================================================================

// Фунция ниже для ознокомительных целей, чтобы понять алгоритм расчета арксинуса методом разложения ряда Тейлора.
// Чтобы посмотреть на саму формулу, нужно найти в интернете "Формула ряда Тейлора для арксинуса".

// "x" - само число, для которого ищется арксинус. "n" - число циклов сумм вычисления от 0 до бесконечности (чем больше число, тем точнее результат).
function Arcsine(x, n) {
  // Получение файториала любого числа.
  function getFactorial(number) {
    return number <= 0 ? 1 : number * getFactorial(number - 1);
  }

  let result = 0;

  for (let i = 0; i <= n; i++) {
    // Расчет числителя.
    let numerator = getFactorial(2 * i);
    // Расчет знаменателя.
    let denominator = Math.pow(4, i) * Math.pow(getFactorial(i), 2) * (2 * i + 1);
    result += (numerator / denominator) * Math.pow(x, 2 * i + 1);
  }

  return result;
}
