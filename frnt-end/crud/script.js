let taskPlaceholder = "Новая задача...";
let container = document.querySelector("main");
let articlesContainer = document.querySelector(".articlesContainer");
let currentTextTarget;
let tasksArray = [];

document.querySelector("#clearList").addEventListener("click", e=>{
	tasksArray.length = 0;
	articlesContainer.style.opacity = '0';
	setTimeout(()=>{
		articlesContainer.innerHTML = "";
		articlesContainer.style.opacity = '1';
	},500);
})

container.addEventListener("focusin", focus);
container.addEventListener("click", focus);
container.addEventListener("focusout", lostFocus);

function focus(e){
	if(event.type == "click" && e.target.classList.contains("task-close-button")){
		removeTask(e.target.closest(".task"));
	}
	if(	e.type == "focusin" &&	e.target.classList.contains("text")) {
		currentTextTarget = e.target;
		currentTextTarget.innerText == taskPlaceholder? e.target.innerHTML = '': false;
	}
}

function removeTask(el){
	el.style.opacity = '0';
	setTimeout(()=>el.remove(),500);

	let deletedInemIndex = tasksArray.indexOf(el);

	delete tasksArray[tasksArray.indexOf(el)];

	for (let i = deletedInemIndex; i < tasksArray.length; i++) {
		if (!(i+1 == tasksArray.length)){
			tasksArray[i] = tasksArray[i+1];
		}
	}

	tasksArray.pop();
	
	updateIndexes();
}


function lostFocus(e){
	if (!currentTextTarget) return;
	let taskText = currentTextTarget.innerText.trim();
	taskText == "" || taskText == taskPlaceholder? currentTextTarget.innerHTML = taskPlaceholder: currentTextTarget.innerHTML = taskText.trim();
}


function createTask(context) {
	let sourceTextBox = context.closest(".task").querySelector(".text");
	let text = sourceTextBox.innerText;

	if(text == taskPlaceholder) return;

	let task = document.createElement("article");
	task.classList.add("task");

	let numberWrapper = document.createElement("div");
	numberWrapper.classList.add("number-wrapper");

	let number = document.createElement("p");
	number.classList.add("number");

	number.innerHTML = tasksArray.length+1;

	let main = document.createElement("div");
	main.classList.add("main");

	let textBox = document.createElement("div");
	textBox.classList.add("text");
	textBox.contentEditable = true;
	textBox.innerHTML = text;

	let taskClose = document.createElement("div");
	taskClose.classList.add("task-close-button-container");

	let taskButton = document.createElement("button");
	taskButton.classList.add("task-close-button");
	taskButton.classList.add("task-button");
	taskButton.innerHTML = "×";

	taskClose.append(taskButton);

	main.append(textBox);

	numberWrapper.append(number);

	task.append(numberWrapper);
	task.append(main);
	task.append(taskClose);

	tasksArray.push(task);

	articlesContainer.append(task);

	sourceTextBox.innerText = taskPlaceholder;
}

function updateIndexes(el) {
	for (let i = 0; i < tasksArray.length; i++) {
		tasksArray[i].querySelector('.number').innerText = i+1;
	}
}



