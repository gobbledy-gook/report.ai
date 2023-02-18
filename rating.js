const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
var rating = 0;
btn.onclick = () => {
  // console.log("Button Clicked!");
  var b1 = document.getElementsByClassName("radiobutton");
  // console.log("radio fetched!");
  for (let i = 0; i < 5; i++) {
    if (b1[i].checked) {
      console.log(5 - i);
      rating = 5 - i;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;
        var currentTitle = tabs[0].title;
        var currentSiteName = currentUrl.split("/")[2]; // Get the third part of the URL
        console.log(currentUrl);
        saveEntry(rating, currentUrl);
        url = currentUrl;
      });
    }
  }
  btn.style.backgroundColor = "white";
  btn.style.color = "#111";

  return false;
};

function saveEntry(rating, url) {
  let data = { rating: rating, url: url };
  console.log(data);
  fetch("http://127.0.0.1:5000/save_entry", {
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
