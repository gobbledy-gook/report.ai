chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo.tabId);
  console.log("Tab changed");
});
