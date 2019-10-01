function slider(my_slider) {

  let arrSliderItem = my_slider.querySelectorAll("li"),
      sliderList = my_slider.querySelector("ul");

      console.log(arrSliderItem);
      console.log(sliderList);

  widhtSlider();
  setWidthHeightSlider()

  function widhtSlider() {
    myWidhtSlider = my_slider.offsetWidth;
    return myWidhtSlider;
  }

  function setWidthHeightSlider() {
    sliderList.style.width = arrSliderItem.length * myWidhtSlider + "px";
  }

  window.addEventListener("resize", function () {
    windowResize();
  })

  let check;

  function windowResize() {
    clearTimeout(check);
    check = setTimeout(function () {
      clearInterval(animations);
      widhtSlider();
      setWidthHeightSlider();
    }, 100)
  }
}