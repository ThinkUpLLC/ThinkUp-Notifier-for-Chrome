// Saves options to sync storage.
function save_options(e) {
	e.preventDefault();

	var ThinkUpSettings = {}

	ThinkUpSettings.install_url = document.getElementById("install_url").value.slice(-1) == '/' ?
	document.getElementById("install_url").value : document.getElementById("install_url").value+'/';
	ThinkUpSettings.install_api_key = document.getElementById("install_api_key").value;
	ThinkUpSettings.email_address = document.getElementById("email_address").value;

	if (!ThinkUpSettings.install_url || !ThinkUpSettings.install_api_key || !ThinkUpSettings.email_address) {
		var status = document.getElementById("status");
		status.innerHTML = '<div class="alert alert-error">All the fields are required!<br/>Options not saved.</div>';
		return;
	}

	chrome.storage.sync.set(
		ThinkUpSettings,
		function() {
			// Update status to let user know options were saved.
			var status = document.getElementById("status");
			status.innerHTML = '<div class="alert alert-success">Options saved.</div>';
			setTimeout(function() {
				status.innerHTML = "";
			}, 5000);
		}
	);
}

// Restores option fields to saved values from localStorage.
function restore_options() {
	chrome.storage.sync.get(
		null,
		function(ThinkUpSettings) {
			if (!ThinkUpSettings.install_url || !ThinkUpSettings.install_api_key || !ThinkUpSettings.email_address) {
				return;
			}

			document.getElementById("install_url").value = ThinkUpSettings.install_url;
			document.getElementById("install_api_key").value = ThinkUpSettings.install_api_key;
			document.getElementById("email_address").value = ThinkUpSettings.email_address;
		}
	);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);