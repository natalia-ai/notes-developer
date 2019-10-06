function slider(my_slider) {

  let
    arrSliderItem = my_slider.querySelectorAll("li"),
    sliderList = my_slider.querySelector("ul"),
    controller = my_slider.querySelector(".controller");

  widhtSlider();
  setWidthHeightSlider()

  function widhtSlider() {
    myWidhtSlider = my_slider.offsetWidth;
    myWidhtController = myWidhtSlider/arrSliderItem.length;
    return myWidhtSlider;
  }

  function setWidthHeightSlider() {
    sliderList.style.width = arrSliderItem.length * myWidhtSlider + "px";
    controller.style.width = myWidhtController + "px";
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
    mouseTouthDown(e);
  })

  sliderList.addEventListener("mousemove", function (e) {
    mouseToucthMove(e);
  })

  document.addEventListener("mouseup", function (e) {
    mouseToucthUp();
  })

  // toutch

  sliderList.addEventListener("touchstart", function (e) {
    mouseTouthDown(e);
  })

  sliderList.addEventListener("touchmove", function (e) {
    mouseToucthMove(e);
  })

  document.addEventListener("touchend", function (e) {
    mouseToucthUp();
  })

  function mouseTouthDown(e) {

    e = e || event;

    startClientX = e.clientX || e.touches[0].clientX;
    startMarginLeft = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));
    checkMouseDown = true;

    sliderList.classList.add("sider--active");

    return startClientX, startMarginLeft, checkMouseDown;

  }

  function mouseToucthMove(e) {

    e = e || event;
    if (checkMouseDown) {

      let newMarginLeft = startMarginLeft + -(startClientX - (e.clientX || e.touches[0].clientX))

      if (newMarginLeft > 0) {
        newMarginLeft = 0;
      } else if (newMarginLeft < -((arrSliderItem.length - 1) * myWidhtSlider)) {
        newMarginLeft = -((arrSliderItem.length - 1) * myWidhtSlider)
      }

      sliderList.style.marginLeft = newMarginLeft + "px";
    }
  }

  function mouseToucthUp() {
    if (checkMouseDown) {
      checkMouseDown = false;
      sliderList.classList.remove("sider--active");
      moveSlider();
    }
  }

  function moveSlider() {

    let upCord = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));

    for (let i = 0; i < arrSliderItem.length; i++) {

      if (-(myWidhtSlider / 2) < (upCord + myWidhtSlider * i)) {

        sliderList.style.marginLeft = -myWidhtSlider * i + "px";

        sliderList.style.transition = 250 + "ms";

        return setTimeout(function () {
          sliderList.style.transition = "";
        }, 250)

      }

      console.log(-(myWidhtSlider / 2) + " - " + upCord + myWidhtSlider * i)
    }

  }

}