const container = document.getElementById("block");

let usersUrl = "https://jsonplaceholder.typicode.com/users";
let photosUrl = "https://jsonplaceholder.typicode.com/photos";

const users = [];
const photos = [];

function requestMaker (urlOne, urlTwo) {



	function serverRequest (targetUrl) {

		fetch (targetUrl)

		.then(rs => {

			return rs.json();

		})

		.then(dt => {

			let breaker = 0;

			for (let key in dt) {

				if (targetUrl == urlOne) {
					users[key] = dt[key]

					breaker++;

					if (breaker == 10) {

						breaker = 0;

						serverRequest(urlTwo);
					}

					
				}

				if (targetUrl == urlTwo) {

					breaker++;

					if (breaker > 10) {

						blockParser(users, photos);

						break;
					}
					photos[key] = dt[key]
				}
			}

		})

	}

	serverRequest(urlOne);
}




	//console.log("yeet");


function blockParser (targetOne, targetTwo) {
	
	for (let key of targetOne) {

		let block = document.createElement("div");
		let imageBlock = document.createElement("div");
		let paragraphContainer = document.createElement("div");
		block.style.width = "398px";
		block.className += "thirdElBorderCancelling";
		block.style.flexDirection = "column";
		paragraphContainer.style.padding = "20px";
		block.style.display = "flex";
		block.style.flex = "none";
		block.appendChild(imageBlock);
		block.appendChild(paragraphContainer);

		function targetBlockAdder (innerTarget) {


			for (let i in innerTarget) {

				if (typeof innerTarget[i] === "object") {

					paragraphContainer.innerHTML = paragraphContainer.innerHTML + "<br/>" + `${i.toUpperCase()} :` + "<br/>";
					targetBlockAdder(innerTarget[i]);

				}

				else {

					paragraphContainer.innerHTML = paragraphContainer.innerHTML + `${i} : ${innerTarget[i]}` + "<br/>";

				}

			}

			for (let k of targetTwo) {

				imageBlock.innerHTML = `<img width="400px" height="400px" src="${k.url}" alt="#">`

			}

			
		}
		container.appendChild(block);

		targetBlockAdder(key);

	}

}
