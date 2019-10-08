function slider(my_slider) {

  let
    // массив слайдов
    arrSliderItem = my_slider.querySelectorAll("li"),
    // список слайдов
    sliderList = my_slider.querySelector("ul"),
    // контроллер
    controller = my_slider.querySelector(".controller"),
    // проверка на зажатую кнопку мыши на контроллере
    checkMouseDownController = false,
    // проверка на зажатую кнопку мыши на слайдере
    checkMouseDown = false,
    // координата при клике на слайдер или контроллер
    startClientX,
    // маргин с которого начинается движение
    startMarginLeft,
    // пикселей в одном проценте ширины слайдера
    percentSlider,
    // пикселей в одном проценте ширины контроллера
    percentController,
    // проверка для задержки во время ресайза
    check;

  // получаем все размеры слайдера
  widhtSlider();
  // задаем все размеры слайдеру
  setWidthHeightSlider();


  // функция получения размеров
  function widhtSlider() {
    // получили ширину слайдера
    myWidhtSlider = my_slider.offsetWidth;
    // получили ширину контроллера
    myWidhtController = myWidhtSlider / arrSliderItem.length;
    // получили количество пикселей в одном проценте ширины слайдера
    percentSlider = (myWidhtSlider * (arrSliderItem.length - 1)) / 100;
    // получили количество пикселей в одном проценте ширины контроллера
    percentController = (myWidhtController * (arrSliderItem.length - 1)) / 100;

    // вернули все переменные что бы они были доступны везде
    return myWidhtSlider, myWidhtController, percentSlider, percentController;
  }


  // функция задает размеры слайдеру
  function setWidthHeightSlider() {
    // задаем ширину слайдеру
    sliderList.style.width = arrSliderItem.length * myWidhtSlider + "px";
    // задаем ширину контроллеру
    controller.style.width = myWidhtController + "px";
  }


  // отслеживаем ресайз
  window.addEventListener("resize", function () {

    // постоянно вызываем функцию с задеркой, в ней же все вызовы функций необходимые после ресайза
    windowResize();
  })


  // определяем завершение ресайза
  function windowResize() {
    // отменяем задержку
    clearTimeout(check);

    // запускаем задержку
    check = setTimeout(function () {

      // вызов необходимых функций

      // заново получаем размеры слайдера
      widhtSlider();
      // заново задаем размеры слайдеру
      setWidthHeightSlider();

      // сдвигаем слайдер на первый слайд
      sliderList.style.marginLeft = 0;
      // сдвигаем контроллер на первый слайд
      controller.style.marginLeft = 0;

      // и задержка, 100 ms достаточно
    }, 100)
  }

  // отслеживание клика и касания по слайдеру
  // клик
  sliderList.addEventListener("mousedown", function (e) {
    mouseTouthDown(e);
  })
  // касание
  sliderList.addEventListener("touchstart", function (e) {
    mouseTouthDown(e);
  })

  // отслеживаем движение курсора и пальца по слайдеру
  // курсор
  document.addEventListener("mousemove", function (e) {
    // движение слайдера
    mouseToucthMove(e);
    // движение контроллера
    mouseToucthMoveController(e);
  })
  // сенсор
  document.addEventListener("touchmove", function (e) {
    // движение слайдера
    mouseToucthMove(e);
    // движение контроллера
    mouseToucthMoveController(e);
  })

  // поднятие пальца с кнопки мыши (с сенсора)
  document.addEventListener("mouseup", function () {
    // поднятие пальуа при движение слайдера
    mouseToucthUp();
    // доводчик слайдера
    moveSlider();
    // доводчик контроллера
    moveController();
  })
  document.addEventListener("touchend", function () {
    // поднятие пальуа при движение слайдера
    mouseToucthUp();
    // доводчик слайдера
    moveSlider();
    // доводчик контроллера
    moveController();
  })

  // при клике по слайдеру
  function mouseTouthDown(e) {

    // кроссбраузерный event
    e = e || event;

    // получаем начальную координату при клика(касания)
    startClientX = e.clientX || e.touches[0].clientX;
    // получаем установленный маргин слайдера
    startMarginLeft = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));
    // отмечаем что нужно следить за движением мыши
    checkMouseDown = true;

    // задаем класс списку что бы поменять курсор
    sliderList.classList.add("slider--active");

    // возвращаем все переменные
    return startClientX, startMarginLeft, checkMouseDown;
  }

  // при движении курсора(мыши)
  function mouseToucthMove(e) {

    // кроссбраузерный event
    e = e || event;

    // если кнопка мыши зажата
    if (checkMouseDown) {

      // получаем новый маргин по движению курсора (мыши)
      let newMarginLeft = startMarginLeft + -(startClientX - (e.clientX || e.touches[0].clientX))

      // запрет скролла вправо если первый слайд
      if (newMarginLeft > 0) {
        newMarginLeft = 0;
      }

      // запрет скролла влево, если крайний слайд
      if (newMarginLeft < -((arrSliderItem.length - 1) * myWidhtSlider)) {
        newMarginLeft = -((arrSliderItem.length - 1) * myWidhtSlider)
      }

      // двигаем список слайдов
      sliderList.style.marginLeft = newMarginLeft + "px";

      // получаем отступ для контроллера
      newMarginLeftController = (newMarginLeft / percentSlider) * percentController;

      // сдвигаем контроллер
      controller.style.marginLeft = -newMarginLeftController + "px";
    }
  }

  // при отпускании кнопки мыши (поднятии пальца)
  function mouseToucthUp() {
    // если двигали слайдер
    if (checkMouseDown) {
      // отмечаем что кнопка мыши больше не зажата
      checkMouseDown = false;
      // убираем класс у списка, что бы вернуть курсор
      sliderList.classList.remove("slider--active");
    }

    // если двигали контроллер
    if (checkMouseDownController) {
      // отмечаем что кнопка мыши больше не зажата
      checkMouseDownController = false;
      // убираем класс у списка, что бы вернуть курсор
      controller.classList.remove("slider--active");
    }
  }

  // maus
  // клик, касание по контроллеру
  controller.addEventListener("mousedown", function (e) {
    mouseTouthDownController(e);
  })
  controller.addEventListener("touchstart", function (e) {
    mouseTouthDownController(e);
  })

  // при клике (касании) по контроллеру
  function mouseTouthDownController(e) {

    // кроссбраузерный event
    e = e || event;

    // координаты клика (касания)
    startClientX = e.clientX || e.touches[0].clientX;

    // стартовый margin контроллера
    startMarginLeft = Number(getComputedStyle(controller).marginLeft.replace("px", ""));

    // отмечаем что будем двигать контроллер
    checkMouseDownController = true;

    // задаем класс для изменения курсора
    controller.classList.add("slider--active");

    // возвращаем все переменные
    return startClientX, startMarginLeft, checkMouseDownController;

  }

  // движение контроллера
  function mouseToucthMoveController(e) {

    // кроссбраузерный event
    e = e || event;

    // если был клик по контроллеру
    if (checkMouseDownController) {

      // новая координа для движения контроллера
      let newMarginLeft = startMarginLeft + -(startClientX - (e.clientX || e.touches[0].clientX))

      // что бы контроллер не уходил за пределы слайдера влево
      if (newMarginLeft <= 0) {
        newMarginLeft = 0;
      }

      // что бы контроллер не уходил за пределы слайдера вправо
      if (newMarginLeft > myWidhtSlider - myWidhtController) {
        newMarginLeft = myWidhtSlider - myWidhtController;
      }

      // сдвигаем контроллер
      controller.style.marginLeft = newMarginLeft + "px";

      // получаем новую координату для движения слайдера
      newMarginLeftSlider = (newMarginLeft / percentController) * percentSlider;

      // двигаем слайдер
      sliderList.style.marginLeft = -newMarginLeftSlider + "px";
    }
  }

  // доводчик контроллера
  function moveController() {

    // получаем отступ контроллера
    let upCord = Number(getComputedStyle(controller).marginLeft.replace("px", ""));

    // проверяем на каком слайде остановились
    for (let i = 0; i < arrSliderItem.length; i++) {

      // если у текущего слайда отступ меньше половины ширины контроллера (слайдера)
      if ((myWidhtController / 2) > (upCord - myWidhtController * i)) {

        // делаем изменение маргина анимированным
        controller.style.transition = 250 + "ms margin";

        // ставим нужный маргин
        controller.style.marginLeft = myWidhtController * i + "px";

        return setTimeout(function () {
          // после задержки отменяем анимацию маргина
          controller.style.transition = "";
          // задержка равна времени анимации
        }, 250)

      }

    }

  }


  // доводчик слайдера
  function moveSlider() {

    // получем отступ слайдера
    let upCord = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));

    // проверяем на каждом слайде
    for (let i = 0; i < arrSliderItem.length; i++) {

      // если отступ данного слайда меньше половины ширины слайдера
      if (-(myWidhtSlider / 2) < (upCord + myWidhtSlider * i)) {

        // делаем анимированное движение
        sliderList.style.transition = 250 + "ms margin";

        // ставим данный слайд на начало
        sliderList.style.marginLeft = -myWidhtSlider * i + "px";

        // после завершения анимации
        return setTimeout(function () {
          // отманяем анимацию
          sliderList.style.transition = "";
        }, 250)
      }
    }
  }



}