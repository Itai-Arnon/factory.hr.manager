


let fullname;




const displayUserLogo = async () => {
	fullname = JSON.parse(sessionStorage.getItem("name"));
	let userElement = document.querySelector("#userElement")
	let user_login = document.querySelector(".user-login");
	// Check if the user is logged in
	if (fullname) {
		// Create an element to display the user's name
		userElement.textContent = `${fullname}`;
		userElement.fontcolor = "blue";
		userElement.style.fontWeight = "italic";
		userElement.style.padding = "0.5px";
		userElement.style.backgroundColor = "white";
		userElement.style.textAlign = "center";
		userElement.style.marginBottom = "2px";
		// Append the user element to the body

		user_login.appendChild(userElement);
	}


	if (!window.location.pathname.endsWith('index.html')) {
		const logoutButton = document.querySelector("#logout")
		logoutButton.addEventListener("click", logout);
	}
}

function interpretServerResponse(res, action) {
	// Check if the response status code indicates success (200-299 range)
	if (res.status >= 200 && res.status < 300) {
		alert(`${action} was successfull`);

		// Optionally, handle the response data if needed
		if (res.data) {
			console.log("Response data:", JSON.stringify(res.data));
		}
	} else {
		// Handle different types of errors based on status code
		alert("${action} failed with status code:", res.status);
		if (res.data) {
			console.error("Error details:", JSON.stringify(res.data));
		}
		// You can add more specific error handling here based on status codes
	}
}




function logout() {
	// Remove token and name from sessionStorage

	sessionStorage.removeItem("token");
	sessionStorage.removeItem("name");

	window.location.href = "./index.html";
}

window.addEventListener("load", () => displayUserLogo());