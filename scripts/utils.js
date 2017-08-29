function handleRefresh() {
	var url= blob_storage_url + "/fp-container/"+current_device+".json"
		+"?random="+(new Date()).getTime();
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", url);
	newScriptElement.setAttribute("id", "canvas_jsonp");
	var oldScriptElement = document.getElementById("canvas_jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement == null) {
		head.appendChild(newScriptElement);
	} else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

function StartToDemo(dev_chosen) {
	current_device = dev_chosen;
	if (refresh_job) {
		clearInterval(refresh_job);
	}
	refresh_job = setInterval(demoRefresh, 1000);
}

function StartToRefresh(dev_chosen) {
	current_device = dev_chosen;
	if (refresh_job) {
		clearInterval(refresh_job);
	}
	refresh_job = setInterval(handleRefresh, 1000);
}

// Function will be called by the PHP script (dynamically)
function CreateClassRoomList() {

	var oldDevList = document.getElementById("devList");	
	var newDevList = document.createElement("div");
	newDevList.setAttribute("id", "devList");

	// sample link
	var sampleLink = document.createElement("a");
	// Create a new function of DisplaySampleList()
	sampleLink.setAttribute("onclick", "hideSidebar(); DisplaySampleList()");
	sampleLink.innerHTML = "Sample Classroom";
	newDevList.appendChild(sampleLink);
	// finish appending sample link

	// So theoretically, the classRoomList should be ready to be deployed by now
	for (var k = 0; k < classRoomList.length; k++) {

		var devLink = document.createElement("a");
		devLink.setAttribute("onclick", "hideSidebar(); DisplayDeviceNames(this)");
		// var params = './index.php?data=true&devid='+classRoomList[k]["classRoomId"];
		// console.log(params);
		// devLink.setAttribute("href", params);
		devLink.innerHTML = classRoomList[k]["classRoomId"];

		// listElem.appendChild(devLink);
		newDevList.appendChild(devLink);
	}
	oldDevList.parentNode.replaceChild(newDevList, oldDevList);
	
	var classesValue = document.getElementById("classesValue");
	if (classesValue) {
		classesValue.innerHTML = (classRoomList.length + 1).toString();
	}
}

function DisplayDeviceNames(className) {

	// var devNameList = document.getElementById("devNameList");
	var devNameList = document.createElement("ul");
	var oldDevNameList = document.getElementById("devNameList");
	devNameList.setAttribute("id", "devNameList");

	// search for the class first
	var classRoomObj;
	for (var i = 0; i < classRoomList.length; i++) {
		if (classRoomList[i]["classRoomId"] == className.innerHTML) {
			classRoomObj = classRoomList[i];
			var currentClassName = document.getElementById("className");
			var devicesValue = document.getElementById("devicesValue");

			currentClassName.innerHTML = classRoomList[i]["classRoomId"];
			devicesValue.innerHTML = classRoomList[i]["deviceList"].length.toString();
			break;
		}
	}

	for (var i = 0; i < classRoomObj["deviceList"].length; i++) {

		var currentName = classRoomObj["deviceList"][i];
		var currentList = document.createElement("li");
		var devName = document.createElement("a");
		var params = './index.php?data=true&devid='+classRoomObj["classRoomId"]+"-"+currentName;

		devName.setAttribute("href", params);
		devName.innerHTML = currentName;
		currentList.appendChild(devName);
		devNameList.appendChild(currentList);
	}

	oldDevNameList.parentNode.replaceChild(devNameList, oldDevNameList);
}

function demoRefresh() {
	var demoObj = {
		"devId": "",
		"buffer": []
	};

	for (var i = 0; i < 1024; i++) {
		demoObj["buffer"].push(0);
	}

	demoObj["devId"] = current_device;
	if (current_device == "function-of-beats") {
		
		for (var i = 0; i < 1024; i++) {
			demoObj["buffer"][i] = 600.0 * Math.cos((i + demoParam)/ 100.0 * Math.PI) * Math.cos((i + demoParam)/ 10.0 * Math.PI);
		}
	} else if (current_device == "waves") {
		for (var i = 0; i < 1024; i++) {
			demoObj["buffer"][i] = 600.0 * Math.cos((i + demoParam)/ 100.0 * Math.PI);
		}
	} else if (current_device == "clausen-function") {
		for (var i = 0; i < 1024; i++) {
			var ans = 0;
			for (var k = 1; k < 1000; k++) {
				ans += Math.sin(k * ((i+demoParam) / 200.0 * Math.PI)) / (k * k);
			}
			demoObj["buffer"][i] = 600.0 * ans;
		}
	}

	demoParam += 1;
	DisplayDevice(demoObj);
}


function DisplaySampleList() {
	var devNameList = document.createElement("ul");
	var oldDevNameList = document.getElementById("devNameList");
	devNameList.setAttribute("id", "devNameList");

	for (var i = 0; i < 3; i++) {
		var currentList = document.createElement("li");
		var devName = document.createElement("a");

		if (i == 0) {
			devName.setAttribute("href", './index.php?data=true&devid=function-of-beats&demo=true');
			devName.innerHTML = "function-of-beats";
		} else if (i == 1) {
			devName.setAttribute("href", './index.php?data=true&devid=waves&demo=true');
			devName.innerHTML = "waves";
		} else if (i == 2) {
			devName.setAttribute("href", './index.php?data=true&devid=clausen-function&demo=true');
			devName.innerHTML = "clausen-function";
		}
		
		currentList.appendChild(devName);
		devNameList.appendChild(currentList);
	}
	

	oldDevNameList.parentNode.replaceChild(devNameList, oldDevNameList);

	// Update total number of samples, and class room name
	var devicesValue = document.getElementById("devicesValue");
	devicesValue.innerHTML = 3;
	document.getElementById("className").innerHTML = "Sample Classroom";
}

function revealSidebar() {
	document.getElementById("sidebar").style.display = "block";
}

function hideSidebar() {
    document.getElementById("sidebar").style.display = "none";
}

var drawClock = function() {
	var clockCanvas = document.getElementById("clockCanvas");
	var context = clockCanvas.getContext("2d");
	context.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
	var baseImage = document.getElementById("myClock")
	context.drawImage(baseImage, 0, 0, clockCanvas.width, clockCanvas.height);

	var currentdate = new Date();

	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(clockCanvas.width/2, clockCanvas.height/2);

	var theta_h = (Math.PI / 6 * ((currentdate.getSeconds()/3600 + currentdate.getMinutes()/60 + currentdate.getHours()) - 3));
	var coor_y_hr = 0.20 * clockCanvas.width * Math.sin(theta_h);
	var coor_x_hr = 0.20 * clockCanvas.width * Math.cos(theta_h);
	context.lineTo(clockCanvas.width/2+coor_x_hr, clockCanvas.height/2+coor_y_hr);
	context.stroke();

	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(clockCanvas.width/2, clockCanvas.height/2);

	var theta_m = 0.0 - (0.5 - (currentdate.getSeconds()/60 + currentdate.getMinutes()) / 30) * Math.PI;
	var coor_y_mins = 0.25 * clockCanvas.width * Math.sin(theta_m);
	var coor_x_mins = 0.25 * clockCanvas.width * Math.cos(theta_m);
	context.lineTo(clockCanvas.width/2+ coor_x_mins, clockCanvas.height/2+coor_y_mins);
	context.stroke();

	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(clockCanvas.width/2, clockCanvas.height/2);

	var theta_s = 0.0 - (0.5 - currentdate.getSeconds() / 30) * Math.PI;
	var coor_y = 0.35 * clockCanvas.width * Math.sin(theta_s);
	var coor_x = 0.35 * clockCanvas.width * Math.cos(theta_s);
	context.lineTo(clockCanvas.width/2+coor_x, clockCanvas.height/2+coor_y);
	context.stroke();
}

function DoSubmit() {
	var registeredName = document.getElementById('registeredName');
	var formclassname = document.getElementById('formclassname');
	var formdevname = document.getElementById('formdevname');
	
	var classnameStr = formclassname.value;
	var devnameStr = formdevname.value;
	
	if (classnameStr == "" && devnameStr == "") {
		document.getElementById('formclassnamelog').innerHTML = "class name empty.";
		document.getElementById('formdevnamelog').innerHTML = "device name empty.";
		return false;
	} else if (classnameStr == "") {
		document.getElementById("formclassnamelog").innerHTML = "class name empty.";
		document.getElementById("formdevnamelog").innerHTML = "";
		return false;
	} else if (devnameStr == "") {
		document.getElementById("formdevnamelog").innerHTML = "device name empty.";
		document.getElementById("formclassnamelog").innerHTML = "";
		return false;
	}
	
	var patternDefined = /[^abcedfghijklmnopqrstuvwxyz0123456789]/g;
	var classnameresult = classnameStr.match(patternDefined);
	var devnameresult = devnameStr.match(patternDefined);
	
	if (classnameresult && devnameresult) {
		document.getElementById('formclassnamelog').innerHTML = "only non-capital alphanumerics are allowed.";
		document.getElementById('formdevnamelog').innerHTML = "only non-capital alphanumerics are allowed.";
		return false;
	} else if (classnameresult) {
		document.getElementById('formclassnamelog').innerHTML = "only non-capital alphanumerics are allowed.";
		document.getElementById('formdevnamelog').innerHTML = "";
		return false;
	} else if (devnameresult) {
		document.getElementById('formclassnamelog').innerHTML = "";
		document.getElementById('formdevnamelog').innerHTML = "only non-capital alphanumerics are allowed";
		return false;
	} else {
		document.getElementById('formclassnamelog').innerHTML = "";
		document.getElementById('formdevnamelog').innerHTML = "";
		
		registeredName.value = classnameStr + '-' + devnameStr;
		formclassname.setAttribute('disabled', 'disabled');
		formdevname.setAttribute('disabled', 'disabbled');
		return true;
	}
}
