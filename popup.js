if (localStorage["install_url"]) {
	document.getElementById("thinkup-if").src = localStorage["install_url"];
} else {
	chrome.tabs.create({url: chrome.extension.getURL("options.html"), selected: true});
}
