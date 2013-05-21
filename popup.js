chrome.storage.sync.get(
	null,
	function(ThinkUpSettings) {
		if (ThinkUpSettings.install_url) {
			document.getElementById("thinkup-if").src = ThinkUpSettings.install_url;
		} else {
			chrome.tabs.create({url: chrome.extension.getURL("options.html"), selected: true});
		}
	}
);