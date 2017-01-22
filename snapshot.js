function snapshot() {
    
    var video = document.getElementsByTagName("video")[0];
    if (!video) {
	console.log("No video found");
	return;
    }

    var isPlaying = (video.currentTime > 0) && !video.paused && !video.ended && (video.readyState > 2);
    
    if (isPlaying) {
	video.pause();
    }
    
    try {
	var cvs = document.createElement("canvas");
	cvs.setAttribute("width", video.videoWidth);
	cvs.setAttribute("height", video.videoHeight);
	
	var ctx = cvs.getContext('2d');
	ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
	var dataUrl = cvs.toDataURL();
	
	var loadInBackground = 1;
	if (loadInBackground) {
	    chrome.runtime.sendMessage(
		null, {dataUrl: dataUrl}, null,
		function(response) {
		    console.log('Screenshot save: ' + response);
		});
	} else {
	    window.open(dataUrl, '_blank');
	}
	
    } finally {
	if (isPlaying) {
	    video.play();
	}
    }
}

snapshot();
