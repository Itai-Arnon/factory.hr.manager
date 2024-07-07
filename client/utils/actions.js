


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




function logout() {
	// Remove token and name from sessionStorage

	sessionStorage.removeItem("token");
	sessionStorage.removeItem("name");

	window.location.href = "./index.html";
}

window.addEventListener("load", () => displayUserLogo());