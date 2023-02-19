const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
const askbtn = document.querySelector("askbtn");
btn.onclick = () => {
  var review = document.getElementById("review").value;
  var b1 = document.getElementsByClassName("radiobutton");
  for (let i = 0; i < 5; i++) {
    if (b1[i].checked) {
      var rating = i;
    }
  }
  btn.style.backgroundColor = "white";
  btn.style.color = "#111";
  console.log("Rated Value: ", 5-rating)
  console.log("Review :", review);
  return false;
};

askbtn.onclick = () => {
  var ques = document.getElementById("ask").value;
} 

// console.log(star_buttons);
// star_buttons.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     console.log(e.target);
//   });
// });
