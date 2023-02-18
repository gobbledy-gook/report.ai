function logger(result) {
  // console.log(result.key.length);
  // document.querySelector("#count").innerHTML = result.key.freq_count;
  // while(result.key.summary === undefined){
  //   document.querySelector("#summary").innerHTML = "AI Running..."
  // }
  document.querySelector("#summary").innerHTML = result.key.summary;
  console.log("Summary: ", result.key.summary);
  let colors = ["rgba(255, 54, 54, 0.735)", "rgba(54, 255, 134, 0.735)", "rgba(54, 181, 255, 0.785)", "rgba(255, 201, 54, 0.761)", "rgba(255, 255, 255, 0.535)"]
  for (let i = 0; i < 5; i++) {
    // console.log(result.key[i]);
    var s = document.createElement("span");
    s.innerHTML = result.key.freq_word[i];
    s.style.backgroundColor = colors[i];
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
