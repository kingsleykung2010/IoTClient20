// The method below is going to update the global variable named, classRoomList
function UpdateList(i_jsonObj) {
	var invalidDevices = 0;

	// Foreach and every entry of the device-list
	for (var i = 0; i < i_jsonObj.length; i++)
	{
		// var devLink = document.createElement("a");
		// var devLink = document.createElement("a");
		// devLink.setAttribute("onclick", "StartToRefresh(this);hideSidebar()");

		// We dun expect a null token
		if (i_jsonObj[i] != "") {

			// Furthermore, we expect the token to consist of at least a single hyphen
			if (i_jsonObj[i].indexOf('-') >= 0) {
				// So, this one is valid
				// We extract the classRoomId and the deviceName:
				var classRoomId = i_jsonObj[i].substring(0, i_jsonObj[i].indexOf('-'));
				var deviceName = i_jsonObj[i].substring(i_jsonObj[i].indexOf('-') + 1);

				// using the classRoomId, we are going to search through the global variable for the existence of the classRoomId
				var classRoomObj = null;
				for (var j = 0; j < classRoomList.length; j++) {
					if (classRoomList[j]["classRoomId"] == classRoomId) {
						classRoomObj = classRoomList[j];
						break;
					}
				}

				if (classRoomObj != null) {
					// Such an object is found
					// classRoomObj.deviceList is a list
					classRoomObj["deviceList"].push(deviceName);
				} else {
					// Such an object doesn't exist
					// We need to create one
					classRoomObj = {
						"classRoomId": classRoomId,
						"deviceList": [deviceName]
					};

					classRoomList.push(classRoomObj);
					console.log(classRoomList);
				}
			} else {
				console.log(invalidDevices+"th invalid device encountered.");
				invalidDevices += 1;
				continue;
			}
			// devLink.innerHTML = i_jsonObj[i];
		} else {
			console.log(invalidDevices+"th invalid device encountered.");
			invalidDevices += 1;
			continue;
		}
		
		// var devList = document.getElementById("devList");

		// listElem.appendChild(devLink);
		// devList.appendChild(devLink);
	}
}

function DisplayDevice(i_jsonObj) {

	var x_arr = [];
	var y_arr = i_jsonObj["buffer"];
	
	var currentRxValue = document.getElementById("currentRxValue");
	currentRxValue.innerHTML = y_arr[0];
	
	for (var i = 0; i < 1024; i++) {
		x_arr.push(i);
	}

	var maxOfArr = y_arr.reduce(function(a, b) {
		return Math.max(a, b);
	});
	var minOfArr = y_arr.reduce(function(a, b) { 
		return Math.min(a, b);
	});
	var total = 0;

	for (var i = 0; i < y_arr.length; i++) {
		total += y_arr[i];
	}
	var average = total / y_arr.length;

	if (maxOfArr < 100) {
		minOfArr = minOfArr.toFixed(2);
		maxOfArr = maxOfArr.toFixed(2);
		average = average.toFixed(2);
	} else {
		minOfArr = Math.round(minOfArr);
		maxOfArr = Math.round(maxOfArr);
		average = Math.round(average);
	}

	document.getElementById("minValue").innerHTML = minOfArr.toString();
	document.getElementById("maxValue").innerHTML = maxOfArr.toString();	
	document.getElementById("meanValue").innerHTML = average.toString();

	if (graphInst == null) {
		graphInst = new graph("myCanvas");
	}
	
	var histInst = new hist("histCanvas");
	histInst.plot(y_arr);
	graphInst.plot(x_arr, y_arr);

	if (y_arr[0] < dangerous_level) {
		counter += 1;
		if (counter > 5) {
			graphInst.blink = true;
			alertSound.play();
		}
	} else {
		counter = 0;
		graphInst.blink = false;
		alertSound.stop();
	}

	if (i_jsonObj["timeStamps"] != null) {
		var datetimeSent = new Date(i_jsonObj["timeStamps"][0][0]);

		if (!isNaN(datetimeSent.getTime())) {
			document.getElementById("sentYear").innerHTML = datetimeSent.getFullYear();

			if (datetimeSent.getMonth() == 0) {
				document.getElementById("sentMonth").innerHTML = 12;
			} else {
				document.getElementById("sentMonth").innerHTML = datetimeSent.getMonth() + 1;
			}
			
			document.getElementById("sentDay").innerHTML = datetimeSent.getDate();
			document.getElementById("sentHour").innerHTML = datetimeSent.getHours();
			document.getElementById("sentMinute").innerHTML = datetimeSent.getMinutes();
			document.getElementById("sentSecond").innerHTML = datetimeSent.getSeconds();
		}
	}

	if (i_jsonObj["timeStamps"] != null) {
		var datetimeReceived = new Date(i_jsonObj["timeStamps"][0][1]);

		if (!isNaN(datetimeReceived.getTime())) {
			document.getElementById("receivedYear").innerHTML = datetimeReceived.getFullYear();

			if (datetimeReceived.getMonth() == 0) {
				document.getElementById("receivedMonth").innerHTML = 12;
			}
			else {
				document.getElementById("receivedMonth").innerHTML = datetimeReceived.getMonth() + 1;
			}
			
			document.getElementById("receivedDay").innerHTML = datetimeReceived.getDate();
			document.getElementById("receivedHour").innerHTML = datetimeReceived.getHours();
			document.getElementById("receivedMinute").innerHTML = datetimeReceived.getMinutes();
			document.getElementById("receivedSecond").innerHTML = datetimeReceived.getSeconds();
		}
	}
	
	
	var datetimeDisplayed = new Date();

	document.getElementById("displayedYear").innerHTML = datetimeDisplayed.getFullYear();

	if (datetimeDisplayed.getMonth() == 0) {
		document.getElementById("displayedMonth").innerHTML = 12;
	} else {
		document.getElementById("displayedMonth").innerHTML = datetimeDisplayed.getMonth() + 1;
	}
	
	document.getElementById("displayedDay").innerHTML = datetimeDisplayed.getDate();
	document.getElementById("displayedHour").innerHTML = datetimeDisplayed.getHours();
	document.getElementById("displayedMinute").innerHTML = datetimeDisplayed.getMinutes();
	document.getElementById("displayedSecond").innerHTML = datetimeDisplayed.getSeconds();

	if (i_jsonObj["timeStamps"] != null && i_jsonObj["timeStamps"] != null)
	{
		var timeSent = new Date(i_jsonObj["timeStamps"][0][0]);
		var timeReceived = new Date(i_jsonObj["timeStamps"][0][1]);

		if (!isNaN(timeSent.getTime()) && !isNaN(timeReceived.getTime())) {
			var totDelay = (timeReceived.getHours() - timeSent.getHours()) * 3600000 +
							(timeReceived.getMinutes() - timeSent.getMinutes()) * 60000 +
							(timeReceived.getSeconds() - timeSent.getSeconds()) * 1000 +
							(timeReceived.getMilliseconds() - timeSent.getMilliseconds());
							
			if (totDelay < 0) {
				totDelay = 0 - totDelay;
			}

			document.getElementById("delayMS").innerHTML = totDelay;
		}
	}

	document.getElementById("sendingDevId").innerHTML = i_jsonObj["devId"];

	if (i_jsonObj["seqNumbers"]) {
		document.getElementById("sendingDevSeq").innerHTML = i_jsonObj["seqNumbers"][0];

		var seqList = i_jsonObj["seqNumbers"];

		if (seqList[0] > seqList[1]) {
			document.getElementById("lostPackets").innerHTML = (seqList[0] - seqList[1] - 1);
		} else {
			document.getElementById("lostPackets").innerHTML = NaN;
		}
	} else {
		document.getElementById("sendingDevSeq").innerHTML = NaN;
	}
	
	// If the field, metaType is specified
	if (i_jsonObj["metaType"]) {

		// If the field specified is defined
		if (definedMetaType[i_jsonObj["metaType"]]) {
			dangerous_level = definedMetaType[i_jsonObj["metaType"]]["acceptableRange"];
			
			var metaDescript = document.getElementById("metaType");
			metaDescript.innerHTML = definedMetaType[i_jsonObj["metaType"]]["descriptions"];
			
		}
	}
}
