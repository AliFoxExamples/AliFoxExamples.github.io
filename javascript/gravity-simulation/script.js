const startButton = document.getElementById("start");
const ball1 = document.getElementById("ball1");




let physObjects = {
	objectSuitableWithGravityEngine: true,
	physBox: (document.getElementById("physBox")),
	obj1: [ball1, {elasticity : 2, taken: false}],
	obj2: [ball2, {elasticity : 1, taken: false}],
	obj3: [ball3, {elasticity : 0.7, taken: false}]
}



function applyGravityEngineTo (physObjects, physObjectsTarget) {

	if (!physObjects || !physObjectsTarget) {return console.error("Missing arguments!")}
	if (!(physObjects instanceof Object) || !physObjects.objectSuitableWithGravityEngine) {return console.error("Invalid input!")}
	if (!(physObjectsTarget in physObjects)) {return console.error("Requested phys object does not exist!")}
	let [physObj, {elasticity : physObjectsTargetElasticity, taken : status}] = physObjects[physObjectsTarget];
	if (status) {return console.error("Requested phys object is already taken!")}
	physObjects[physObjectsTarget][1].taken = true;


	let physObjectsTargetAcceleration = 0;
	let yVelocity = 0;
	let lastYVelocity;
	let yMaxRange = physObjects.physBox.offsetHeight - physObjects[physObjectsTarget][0].offsetHeight -4;


	function gravity () {
		physObjectsTargetAcceleration += 0.1;
		yVelocity += physObjectsTargetAcceleration;	
		if (yVelocity >= yMaxRange) {
			physObjectsTargetAcceleration = -physObjectsTargetAcceleration + physObjectsTargetElasticity;
			yVelocity = yMaxRange;

			if ((lastYVelocity - yVelocity) == 0) {
				clearInterval(gravityInterval);
				physObjects[physObjectsTarget][1].taken = false;
			}
		}
		physObjects[physObjectsTarget][0].style  = `top: ${yVelocity}px`;
		lastYVelocity = yVelocity;
		yVelocity = Math.round(yVelocity);
	}
	let gravityInterval = setInterval(gravity, 5);
}

function applyGravityEngineToAllPhysObjects () {
	applyGravityEngineTo(physObjects, 'obj1');
	applyGravityEngineTo(physObjects, 'obj2');
	applyGravityEngineTo(physObjects, 'obj3');
}