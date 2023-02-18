const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
btn.onclick = () => {
  console.log("Button Clicked!");
  var b1 = document.getElementsByClassName("radiobutton");
  for (let i = 4; i <= 0; i--) {
    console.log(i);
    if(b1[i].checked){
      console.log(5-i);
    }
  }  

  // editBtn.onclick = () => {
  //   widget.style.display = "block";
  //   post.style.display = "none";
  // }
  return false;
}