chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(activeInfo.tabId);
    alert("Tab Changed");
});