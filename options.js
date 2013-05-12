// Saves options to localStorage.
function save_options() {
	var install_url = document.getElementById("install_url").value;
	localStorage["install_url"] = install_url;

	var install_api_key = document.getElementById("install_api_key").value;
	localStorage["install_api_key"] = install_api_key;

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 5000);
}

// Restores option fields to saved values from localStorage.
function restore_options() {
	// Initialize the option controls.
	var install_url = localStorage["install_url"];
	if (!install_url) {
		return;
	}
	document.getElementById("install_url").value = install_url;

	var install_api_key = localStorage["install_api_key"];
	if (!install_api_key) {
		return;
	}
	document.getElementById("install_api_key").value = install_api_key;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
