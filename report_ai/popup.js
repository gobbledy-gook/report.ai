function logger(result) {
  // return the rating of the site from database
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentUrl = tabs[0].url;
    console.log("Current URL : " + currentUrl);
    getRating(currentUrl);
  });

  const btn1 = document.querySelector("#generate_words");
  const btn2 = document.querySelector("#summary");
  const btn3 = document.querySelector("#askbtn");
  const btn4 = document.querySelector("#refreshBtn");
  
  btn1.onclick = () => {
    // display the fetched word cloud
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

  btn2.onclick = async () => {
    // fetching the summary from server
    // alert("Loading...");
    var Parent = document.getElementById("SummaryParent");
    var gifParent = document.getElementById("loader");
    gifParent.style.display = "flex";
    let gif = document.createElement("img");
    gif.src = "rotate-right.png";
    gif.style.animation = "spin 1.5s linear infinite";
    gif.style.width = "6%";
    gifParent.appendChild(gif);
    try {
      const response = await fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        },
        // sending text to summarize
        body: JSON.stringify(result.key.text),
      });
      const json = await response.json();
      var divSum = document.getElementById("summarizerDiv")
      const summary = json.summary;
      divSum.innerHTML = summary;
      Parent.removeChild(gifParent);
      divSum.style.display = "block";
      btn2.style.display = "none";
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  btn3.onclick = async () => {
	try {
    const question = {
      question: document.getElementById("ask").value,
      context: result.key.text,
    };
	  const response = await fetch("http://127.0.0.1:5000/ask-question", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "Access-Control-Allow-Origin": "*",
		  "Access-Control-Allow-Headers": "Content-Type,Authorization",
		  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
		},
		// sending the question to the server
		body: JSON.stringify(question),
	  });
  
	  const json = await response.json();
	  const answer = json.answer.answer;
  
	  console.log("Answer: ", answer);
	  // Update the UI with the received answer
	  var answerDiv = document.getElementById("Answer");
	  answerDiv.style.display = "block";
	  answerDiv.innerHTML = answer;
	} catch (error) {
	  console.error("Error fetching answer:", error);
	}
  };

  btn4.onclick = () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }

}

function getRating(url) {
  // get rating through API
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

// fetching the local data and calling the logger
chrome.storage.local.get(["key"], logger);
