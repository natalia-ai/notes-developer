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
      
      widhtSlider();
      setWidthHeightSlider();
      sliderList.style.marginLeft = 0;

    }, 100)
  }

  let 
  checkMouseDown = false,
  startClientX,
  startMarginLeft;


  // maus
  sliderList.addEventListener("mousedown", function (e) {
    mouseTouthDown (e);
  })

  sliderList.addEventListener("mousemove", function (e) {
    mouseToucthMove (e);
  })

  document.addEventListener("mouseup", function (e) {
    mouseToucthUp  ();
  })

  // toutch

  sliderList.addEventListener("touchstart", function (e) {
    mouseTouthDown (e);
  })

  sliderList.addEventListener("touchmove", function (e) {
    mouseToucthMove (e);
  })

  document.addEventListener("touchend", function (e) {
    mouseToucthUp ();
  })

  function mouseTouthDown (e) {

    e = e || event;

    startClientX = e.clientX || e.touches[0].clientX;
    startMarginLeft = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));
    checkMouseDown = true;

    sliderList.classList.add("sider--active");

    return startClientX, startMarginLeft, checkMouseDown;

  }

  function mouseToucthMove (e) {

    e = e || event;
    if (checkMouseDown) {

      let newMarginLeft = startMarginLeft + -(startClientX - (e.clientX || e.touches[0].clientX))
      
      if (newMarginLeft > 0 ) {
        newMarginLeft = 0;
      } else if (newMarginLeft < -((arrSliderItem.length - 1) * myWidhtSlider)) {
        newMarginLeft = -((arrSliderItem.length - 1) * myWidhtSlider)
      }

      sliderList.style.marginLeft = newMarginLeft + "px";
    }
  }

  function mouseToucthUp  () {
    checkMouseDown = false;
    sliderList.classList.remove("sider--active");
  }

}