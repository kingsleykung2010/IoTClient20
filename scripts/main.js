// globals
var graphInst = null;
var alertSound;
var counter = 0; // The number of times the callback, DisplayDevice is called
var current_device;
var refresh_job = null;
var classRoomList = [];
var demoParam = 0;
// globals

function DownloadListBlob() {
	// Download blob
	// Start downloading blob, device-list.json
	// The method UpdateList(i_jsonObj) is set as the callback by default.
	
	var oldScriptElement = document.getElementById("myScript");
	var scriptElement = document.createElement("script");
	var src = blob_storage_url + "/fp-container/device-list.json" + 
			"?random=" + (new Date()).getTime();

	scriptElement.setAttribute("src", src);
	scriptElement.setAttribute("id", "myScript");
	var head = document.getElementsByTagName("head")[0];
	
	if (oldScriptElement == null) {
		head.appendChild(scriptElement);
	} else {
		head.replaceChild(scriptElement, oldScriptElement);
	}
}

window.onload = function() {
	DownloadListBlob();
	
	var url = new URL(document.location.href);
	
	if(url.searchParams.get('data') != null) {
		// Data Mode
		alertSound = new sound("audios/alert-4.mp3");
		setInterval(drawClock, 1000);
		
		var devid = url.searchParams.get('devid');
		// if macro_demo is set
		if (url.searchParams.get('demo') != null) {
			// Enter demo mode
			var metaDescript = document.getElementById("metaType");
			metaDescript.innerHTML = definedMetaType["demo"]["descriptions"];
			StartToDemo(devid);
		} else {
			// Enter user mode
			StartToRefresh(devid);
		}
	} else if (url.searchParams.get('reg') != null) {
		// pass
	} else {
		CreateClassRoomList();
		setInterval(CreateClassRoomList, 1000);
		DisplaySampleList();
	}
}
