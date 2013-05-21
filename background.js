function checkInsights(timecheck) {
	chrome.storage.sync.get(
		null,
		function(ThinkUpSettings) {
			var api_url = ThinkUpSettings.install_url + "api/v1/insight.php" + "?since=" + timecheck 
			+ "&as=" + ThinkUpSettings.install_api_key + '&un=' + encodeURI(ThinkUpSettings.email_address);
			//var api_url = localStorage["install_url"] + "test.json";
			console.log(Date() + " checking for new insights " + api_url);

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var data = JSON.parse(xhr.responseText);
					if (typeof data.error === 'undefined') {
						for (var i = 0; i < data.length; i++) {
							var insight = data[i];
							var htmlstripper = document.createElement("div");
							htmlstripper.innerHTML = insight.text;
							var title = insight.prefix.replace(":","");
							var notification = window.webkitNotifications.createNotification("icon.png", title, htmlstripper.innerText);
							notification.show();
						}
					} else {
						console.log('Error: ' + data.error.message);
					}
				}
			}
			xhr.open("GET", api_url, true);
			xhr.send();
		}
	);
	return Math.round(+new Date() / 1000);
}

// Test for notification support.
if (window.webkitNotifications) {
	var timecheck = Math.round(+new Date() / 1000);
	// While activated, show notifications at the display frequency.
	timecheck = checkInsights(timecheck);

	var interval = 5; // The polling interval, in minutes.
	var minutes_passed = 0;
	setInterval(function() {
		minutes_passed++;
		if (minutes_passed >= interval) {
			timecheck = checkInsights(timecheck);
			minutes_passed = 0;
		} else {
			console.log(Date() + ' ' + minutes_passed + ' minute(s) passed since last check, waiting to reach ' + interval);
		}
	}, 60000);
}
