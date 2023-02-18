var theText;
var to_select = ["p", "h1", "h2", "h3", "h5", "h6"];

to_select.forEach((t) => {
  selected = document.querySelectorAll(t);
  selected.forEach((s) => {
    theText += s.innerText;
  });
});
// console.log("test");

var word_count = theText.split(" ").length;

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

var freqMap = wordFreq(theText);
// chrome.runtime.sendMessage(count);
chrome.storage.local.set({ key: word_count });
