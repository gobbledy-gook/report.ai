// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     alert(request);
//   }
// );

function logger(result) {
  document.querySelector("#count").innerHTML = result.key;
  //   console.log(result);
}

chrome.storage.local.get(["key"], logger);
// document.querySelector("#count").innerHTML = word_count.key;

// updateCount();
