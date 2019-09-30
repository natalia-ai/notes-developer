function noJs() {
  let arrNoJs = document.querySelectorAll(".no-js");

  for (let i = 0; i < arrNoJs.length; i++) {
    arrNoJs[i].classList.remove("no-js");
  }
}