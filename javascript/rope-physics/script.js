const physBox = document.getElementById("physBox");
const chain1 = document.getElementById("chain1");
const chain2 = document.getElementById("chain2");
const chain3 = document.getElementById("chain3");
const chain4 = document.getElementById("chain4");
const hinge1 = document.getElementById("hinge1");
const hinge2 = document.getElementById("hinge2");
const hinge3 = document.getElementById("hinge3");
const hinge4 = document.getElementById("hinge4");
const hinge5 = document.getElementById("hinge5");



function getElementDegree (element) {

	let chain4Style = getComputedStyle(element, null);

	let styleValue = chain4Style.getPropertyValue("transform");

	let values = styleValue.split('(')[1];

	values = values.split(')')[0];

	values = values.split(',');

	let cos = values[0];

	var sin = values[1];

	var degree = Math.round(Math.asin(sin) * (180/Math.PI));


	if(cos<0){
	    addDegree = 90 - Math.round(Math.asin(sin) * (180/Math.PI));
	    degree = 90 + addDegree;
	}
	if(degree < 0){
	    degree = 360 + degree;
	}

	return degree;
}


function changeElementDegree (element, degree) {
	let currDegree = getElementDegree(element);
	element.style.transform = `rotate(${currDegree+degree}deg)`;
}




const rope = {

	hinges: [
		{
	    	node: hinge1,
	    	x() { return getRopeElemPos(hinge1, "x") },
	    	y() { return getRopeElemPos(hinge1, "y") },
	    	deg() {return getElementDegree(hinge1) }
	    },
	    {
	    	node: hinge2,
	    	x() { return getRopeElemPos(hinge2, "x") },
	    	y() { return getRopeElemPos(hinge2, "y") },
	    	deg() {return getElementDegree(hinge2) }
	    },
	    {
	    	node: hinge3,
	    	x() { return getRopeElemPos(hinge3, "x") },
	    	y() { return getRopeElemPos(hinge3, "y") },
	    	deg() {return getElementDegree(hinge3) }
	    },
	    {
	    	node: hinge4,
	    	x() { return getRopeElemPos(hinge4, "x") },
	    	y() { return getRopeElemPos(hinge4, "y") },
	    	deg() {return getElementDegree(hinge4) }
	    },
	    {
	    	node: hinge5,
	    	x() { return getRopeElemPos(hinge5, "x") },
	    	y() { return getRopeElemPos(hinge5, "y") },
	    	deg() {return getElementDegree(hinge5) }
	    },
	],
	chains: [
	    {
	    	node: chain1,
	    	x() { return getRopeElemPos(chain1, "x") },
	    	y() { return getRopeElemPos(chain1, "y") },
	    	deg() {return getElementDegree(chain1) }
	    },
	    {
	    	node: chain2,
	    	x() { return getRopeElemPos(chain2, "x") },
	    	y() { return getRopeElemPos(chain2, "y") },
	    	deg() {return getElementDegree(chain2) }
	    },
	    {
	    	node: chain3,
	    	x() { return getRopeElemPos(chain3, "x") },
	    	y() { return getRopeElemPos(chain3, "y") },
	    	deg() {return getElementDegree(chain3) }
	    },
	    {
	    	node: chain4,
	    	x() { return getRopeElemPos(chain4, "x") },
	    	y() { return getRopeElemPos(chain4, "y") },
	    	deg() {return getElementDegree(chain4) }
	    }
	]
}

function getRopeElemPos (el, c) {

	if (c === "x") {

		return el.getBoundingClientRect().left
	}

	else if (c === "y") {

		return el.getBoundingClientRect().top

	}

	else {

		return false
	}
}


