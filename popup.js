function logger(result) {
  document.querySelector("#count").innerHTML = result.key.freq_count;
  document.querySelector("#summary").innerHTML = result.key.summary;
  //   console.log(result);
}

chrome.storage.local.get(["key"], logger);
