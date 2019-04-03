var rangeBox = document.getElementById("box");
var button = document.getElementById("button");

/*
button.onclick = function() {
	var addBlock = document.createElement("div");
	addBlock.tag = "addedBlock";
	rangeBox.appendChild(addBlock);
	
	
	addBlock.style.width = "25px";
	addBlock.style.height = "25px";
	addBlock.style.backgroundColor = "red";
	
	
}
*/












/* Пример поворота блоков */

var button2 = document.getElementById("button2");
var rotateDeg = 0;

button2.onclick = function() {
	rotateDeg =  rotateDeg + 90;
	tBlock.style.transform = "rotate("+rotateDeg+"deg)";
}
































/* Старый-нерабочий способ



button.onclick = function() {
	var addBlock = document.createElement("div");
	addBlock.id = "tBlock";
	rangeBox.appendChild(addBlock);
	var tBlock = document.getElementById("tBlock");

	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer1";
	tBlock.appendChild(addBlock);
	var tBlockContainer1 = document.getElementById("tBlockContainer1");
	
	
	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer2";
	tBlock.appendChild(addBlock);
	var tBlockContainer2 = document.getElementById("tBlockContainer2");
	
	

	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer1Item1";
	tBlockContainer1.appendChild(addBlock);
	var tBlockContainer1Item1 = document.getElementById("tBlockContainer1Item1");
	addBlock.style.width = "23px";
	addBlock.style.height = "23px";
	addBlock.style.backgroundColor = "red";
	addBlock.style.border = "1px green solid"
	
	
	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer2Item1";
	tBlockContainer2.appendChild(addBlock);
	var tBlockContainer2Item1 = document.getElementById("tBlockContainer2Item1");
	addBlock.style.width = "23px";
	addBlock.style.height = "23px";
	addBlock.style.backgroundColor = "red";
	addBlock.style.border = "1px green solid"
	
	
	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer2Item2";
	tBlockContainer2.appendChild(addBlock);
	var tBlockContainer2Item2 = document.getElementById("tBlockContainer2Item2");
	addBlock.style.width = "23px";
	addBlock.style.height = "23px";
	addBlock.style.backgroundColor = "red";
	addBlock.style.border = "1px green solid"
	
	
	
	var addBlock = document.createElement("div");
	addBlock.id = "tBlockContainer2Item3";
	tBlockContainer2.appendChild(addBlock);
	var tBlockContainer2Item3 = document.getElementById("tBlockContainer2Item3");
	addBlock.style.width = "23px";
	addBlock.style.height = "23px";
	addBlock.style.backgroundColor = "red";
	addBlock.style.border = "1px green solid";
	
	
	
	tBlock.style.display = "flex";
	tBlock.style.flexDirection = "column";
	
	
	
	tBlockContainer1.style.display = "flex";
	tBlockContainer1.style.justifyContent = "center";
	tBlockContainer1.style.alignItems = "center";
	
	tBlockContainer2.style.display = "flex";
	tBlockContainer2.style.justifyContent = "center";
	tBlockContainer2.style.alignItems = "center";

	
	
}

*/


