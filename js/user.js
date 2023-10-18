const loggedInUserDisplay = document.getElementById("loggedInUserDisplay");

loggedInUserDisplay.textContent = "Logged In User: " + localStorage.getItem("loggedInUser");

