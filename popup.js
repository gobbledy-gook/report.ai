// chrome.tabs.getSelected(null, function (tab) {
//   chrome.tabs.sendRequest(tab.id, { method: "getText" }, function (response) {
//     if (response.method == "getText") {
//       alltext = response.data;
//     }
//   });
// });

// console.log(alltext);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.getElementById("count").innerText = request;
});
