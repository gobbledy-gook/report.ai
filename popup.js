function logger(result) {
  document.querySelector("#count").innerHTML = result.key;
  //   console.log(result);
}

chrome.storage.local.get(["key"], logger);
