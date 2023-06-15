function logger(result) {
  // let colors = ["rgba(255, 54, 54, 0.735)", "rgba(54, 255, 134, 0.735)", "rgba(54, 181, 255, 0.785)", "rgba(255, 201, 54, 0.761)", "rgba(255, 255, 255, 0.535)"]
  const btn1 = document.querySelector("#generate_words");
  const btn2 = document.querySelector("#summary");
  btn1.onclick = () => {
    for (let i = 0; i < 10; i++) {
      // console.log(result.key[i]);
      var s = document.createElement("span");
      // alert(result.key.freq_word);
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
      if (i === 9) {
        btn1.style.display = "none";
      }
    }
  };

  btn2.onclick = () => {
    console.log("Summary: ", result.key.summary);
    var divSum = document.getElementById("summarizerDiv");
    divSum.style.display = "block";
    divSum.innerHTML = result.key.summary;
    btn2.style.display = "none";
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentUrl = tabs[0].url;
    console.log("Current URL : " + currentUrl);
    getRating(currentUrl);
  });
}

function getRating(url) {
  let data = { url: url };
  fetch("http://127.0.0.1:5000/get_rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log("Response JSON:", json.rating);
      var rating = json.rating;
      console.log(rating.toFixed(2));
      document.getElementById("overallRating").innerHTML = rating.toFixed(2);
    })
    .catch((error) => {});
}

chrome.storage.local.get(["key"], logger);
