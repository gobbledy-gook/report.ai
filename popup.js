function logger(result) {
  // console.log(result.key.length);
  // document.querySelector("#count").innerHTML = result.key.freq_count;
  document.querySelector("#summary").innerHTML = result.key.summary;
  for (let i = 0; i < 5; i++) {
    // console.log(result.key[i]);
    var s = document.createElement("span");
    s.innerHTML = result.key[i];
    s.style.backgroundColor = "rgba(197, 197, 197, 0.208)";
    s.style.border = "1px solid rgba(255, 255, 255)";
    s.style.borderRadius = "3px";
    s.style.padding = "3px";
    s.style.margin = "4px";
    s.style.display = "inline";
    s.style.float = "left";
    var parent = document.getElementsByClassName("worldcloudpara");
    parent[0].appendChild(s);
  }
}

chrome.storage.local.get(["key"], logger);

// for (let i = 0; i < result.key.length; i++) {
//   console.log(result.key[i]);
//   var s = document.createElement("span");
//   s.innerHTML = result.key[i];
//   var parent = document.getElementsByClassName("wordcloud");
//   parent[0].appendChild(s);
// };
