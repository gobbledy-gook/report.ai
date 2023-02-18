// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     alert(request);
//   }
// );
var count;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  alert(request);
  count = request;
});
document.querySelector("#count").innerText = count;