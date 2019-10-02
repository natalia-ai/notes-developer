function slider(my_slider) {

  let arrSliderItem = my_slider.querySelectorAll("li"),
    sliderList = my_slider.querySelector("ul");

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

  let 
  checkMouseDown = false,
  startClientX,
  startMarginLeft;

  sliderList.addEventListener("mousedown", function (e) {

    startClientX = e.clientX;
    startMarginLeft = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));
    checkMouseDown = true;

    console.log(startMarginLeft);

    return startClientX, startMarginLeft, checkMouseDown;

  })



  sliderList.addEventListener("mousemove", function (e) {

    if (checkMouseDown) {

      
      let newMarginLeft = startMarginLeft + -(startClientX - e.clientX)
      
      console.log(startClientX);

      if (newMarginLeft > 0 ) {
        newMarginLeft = 0;
        startClientX = e.clientX;
      } else if (newMarginLeft < -((arrSliderItem.length - 1) * myWidhtSlider)) {
        newMarginLeft = -((arrSliderItem.length - 1) * myWidhtSlider)
      }

      sliderList.style.marginLeft = newMarginLeft + "px";
    }

  })

  document.addEventListener("mouseup", function (e) {
    checkMouseDown = false;
  })

}