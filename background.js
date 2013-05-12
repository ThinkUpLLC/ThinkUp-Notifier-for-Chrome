function checkInsights(timecheck) {
	console.log("Checking insights " + timecheck);

	var api_url = localStorage["install_url"] + "api/v1/insight.php" + "?since=" + timecheck 
	+ "&as=" + localStorage["install_api_key"] + '&un=' + encodeURI(localStorage["email_address"]);
	//var api_url = localStorage["install_url"] + "test.json";
	console.log(api_url);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText);
			if (typeof data.error === 'undefined') {
				for (var i = 0; i < data.length; i++) {
					var insight = data[i];
					var notification = window.webkitNotifications.createNotification("icon.png", insight.prefix, insight.text);
					notification.show();
				}
				date = new Date(data[0].time_generated);
				timecheck = date.getTime();
				console.log("New timecheck " + timecheck);
			} else {
				console.log('Error: ' + data.error.message);
			}
		}
	}
	xhr.open("GET", api_url, true);
	xhr.send();
	return timecheck;
}

// Test for notification support.
if (window.webkitNotifications) {
	var timecheck = Math.round(+new Date() / 1000);
	// While activated, show notifications at the display frequency.
	timecheck = checkInsights(timecheck);

	var interval = 1; // The display interval, in minutes.
	var frequency = interval * 60;
	setInterval(function() {
		interval++;
		console.log("setInterval called " + interval + " at frequency " + frequency);
		if (frequency <= interval) {
			timecheck = checkInsights(timecheck);
			interval = 0;
		}
	}, 10000);
}
