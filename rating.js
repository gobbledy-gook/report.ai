const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
const star_buttons = document.querySelectorAll("input");
btn.onclick = () => {
  widget.style.diplay = "none";
  post.style.display = "block";
  editBtn.onclick = () => {
    widget.style.display = "block";
    post.style.display = "none";
  };
  return false;
};

console.log(star_buttons);
star_buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target);
  });
});
