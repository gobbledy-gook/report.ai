const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
btn.onclick = () => {
  console.log("Button Clicked!");
  var b1 = document.getElementsByClassName("radiobutton");
  console.log("radio fetched!");
  for (let i = 0; i < 5; i++) {
    if(b1[i].checked){
      console.log(i-1);
    }
  }  
  return false;
}