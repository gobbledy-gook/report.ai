var theText;
var to_select = ["p", "h1", "h2", "h3", "h5", "h6"];

to_select.forEach((t) => {
  selected = document.querySelectorAll(t);
  selected.forEach((s) => {
    theText += s.innerText;
  });
});
// console.log("test");

var count = theText.split(" ").length;

function wordFreq(string) {
  var words = string.replace(/[.]/g, "").split(/\s/);
  var freqMap = {};
  words.forEach(function (w) {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });

  return freqMap;
}

chrome.tabs.getSelected(null, function (tab) {
  chrome.tabs.sendRequest(tab.id, { method: "getText" }, function (response) {
    if (response.method == "getText") {
      alltext = response.data;
    }
  });
});

var freqMap = wordFreq(theText);

// chrome.extension.onRequest.addListener(function (
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.method == "getText") {
//     sendResponse({ data: count, method: "getText" }); //same as innerText
//   }
// });
chrome.runtime.sendMessage(count);
