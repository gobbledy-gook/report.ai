const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
var rating = 0;
const askbtn = document.querySelector("#askbtn");
btn.onclick = () => {
  var review = document.getElementById("review").value;
  var b1 = document.getElementsByClassName("radiobutton");
  for (let i = 0; i < 5; i++) {
    if (b1[i].checked) {
      console.log(5 - i);
      rating = 5 - i;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;
        var currentTitle = tabs[0].title;
        var currentSiteName = currentUrl.split("/")[2]; // Get the third part of the URL
        console.log("Current URL : " + currentUrl); // removed unnecessary "str" call
        saveEntry(rating, currentUrl);
      });
    }
  }
  btn.style.backgroundColor = "white";
  btn.style.color = "#111";

  console.log("Review :", review);
  return false;
};

function logger(result) {
  var sum = result.key.summary;

  askbtn.onclick = () => {
    var ques = document.getElementById("ask").value;
    askQuestion(sum, ques);
    // alert(sum);
    // alert(ques);
  };
}

// btn2.onclick = () => {
//   console.log("Summary: ", result.key.summary);
//   var divSum = document.getElementById("summarizerDiv");
//   divSum.style.display = "block";
//   divSum.innerHTML = result.key.summary;
//   btn2.style.display = "none";
// }

// askbtn.onclick = () => {
//   var ques = document.getElementById("ask").value;
//   askQuestion(ques);
// }

function askQuestion(question) {
  let data = { quest: question };
  fetch("https://report-ai.onrender.com/ask-question", {
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
      console.log("Response JSON:", json.answer);
      var answerDiv = document.getElementById("Answer");
      answerDiv.style.display = "block";
      answerDiv.innerHTML = json.answer;
    })
    .catch((error) => {});
}

function saveEntry(rating, url) {
  let data = { rating: rating, url: url };
  console.log(data);
  fetch("https://report-ai.onrender.com/save_entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      // console.log("Request complete! response:", res);
      return res.json(); // return the Promise from res.json()
    })
    .then((json) => {
      console.log("Response JSON:", json);
    })
    .catch((error) => {});
}
// console.log(star_buttons);
// star_buttons.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     console.log(e.target);
//   });
// });

chrome.storage.local.get(["key"], logger);
