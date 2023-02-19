function logger(result) {
  // let colors = ["rgba(255, 54, 54, 0.735)", "rgba(54, 255, 134, 0.735)", "rgba(54, 181, 255, 0.785)", "rgba(255, 201, 54, 0.761)", "rgba(255, 255, 255, 0.535)"]
  const btn1 = document.querySelector("#generate_words");
  const btn2 = document.querySelector("#summary");
  btn1.onclick = () => {
    for (let i = 0; i < 10; i++) {
      console.log(result.key[i]);
      var s = document.createElement("span");
      s.innerHTML = result.key.freq_word[i];
      s.style.backgroundColor = "rgba(255, 255, 255, 0.212)";
      s.style.border = "1px solid rgba(255, 255, 255,0.4)";
      s.style.borderRadius = "3px";
      s.style.padding = "3px";
      s.style.margin = "4px";
      s.style.display = "inline";
      s.style.float = "left";
      var parent = document.getElementsByClassName("worldcloudpara");
      parent[0].appendChild(s);
      if(i===9){
        btn1.style.display = "none";
      }
    }
  }

  btn2.onclick = () => {
    
    console.log("Summary: ", result.key.summary);
    var divSum = document.getElementById("summarizerDiv");
    divSum.style.display = "block";
    divSum.innerHTML = result.key.summary;
    btn2.style.display = "none";
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
