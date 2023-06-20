chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo.tabId);
  alert("Tab changed");
  const btn4 = document.querySelector("#refreshBtn");
  btn4.onclick = () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});
