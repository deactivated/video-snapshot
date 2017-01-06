chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('onClick');
  chrome.tabs.executeScript(null, {file: "snapshot.js"});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	show_snapshot(request.dataUrl);
	sendResponse("OK");
  });


function show_snapshot(dataUrl) {
  chrome.tabs.create({
    url: dataUrl,
    active: false
  });
}
