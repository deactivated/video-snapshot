chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "snapshot.js"});
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    take_snapshot(sender.tab, request, sendResponse);
  });


function show_snapshot(data) {
  chrome.tabs.create({
    url: data,
    active: false
  });
}

function take_snapshot(tab, req, resp) {
  var vid = document.createElement("video");
  vid.setAttribute("width", req.width);
  vid.setAttribute("height", req.height);
  vid.crossOrigin = '';

  vid.src = req.src;

  vid.addEventListener("canplay", function () {
    if (vid.currentTime < req.time) {
      vid.currentTime = req.time;
      vid.play();
      return;
    }
  }, false);

  vid.addEventListener("seeked", function () {
    vid.pause();

    var ctx = cvs.getContext('2d');
    ctx.drawImage(vid, 0, 0, req.width, req.height);
    
    var data = cvs.toDataURL();
    setTimeout(function () {
      vid.removeAttribute('src');
      vid.load();
      document.body.removeChild(vid);
      document.body.removeChild(cvs);
    }, 10);

    show_snapshot(data);
    resp({resume: true});
  }, false);


  var cvs = document.createElement("canvas");
  cvs.setAttribute("width", req.width);
  cvs.setAttribute("height", req.height);
  document.body.appendChild(cvs);

  document.body.appendChild(vid);
}
