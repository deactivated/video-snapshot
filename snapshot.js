function stop_video(vid) {
  vid.pause();
  var s = {
    src: vid.src,
    time: vid.currentTime
  };

  vid.removeAttribute("src")
  vid.load();
  return s;
}

function resume_video(vid, state) {
  vid.src = state.src;
  vid.addEventListener("canplay", function() {
    vid.currentTime = state.time;
    vid.play();
  }, false);
}

function draw() {
  var state, video;
  video = document.getElementsByTagName("video")[0];

  chrome.extension.sendRequest({
    src: video.src,
    width: video.videoWidth,
    height: video.videoHeight,
    time: video.currentTime
  },
  function(response) {
    resume_video(video, state);
  });

  state = stop_video(video);
}

draw();
