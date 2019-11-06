function slider(my_slider) {

  let
    // массив слайдов
    arrSliderItem = my_slider.querySelectorAll("li"),
    // список слайдов
    sliderList = my_slider.querySelector("ul"),
    // контрол
    control = my_slider.querySelector(".control"),
    // контроллер
    controller = my_slider.querySelector(".controller"),
    // проверка на зажатую кнопку мыши на контроллере
    checkMouseDownController = false,
    // проверка на зажатую кнопку мыши на слайдере
    checkMouseDown = false,
    // координата x при клике на слайдер или контроллер
    startClientX,
    // маргин с которого начинается движение
    startMarginLeft,
    // пикселей в одном проценте ширины слайдера
    percentSlider,
    // пикселей в одном проценте ширины контроллера
    percentController,
    // ширина слайдера
    myWidhtSlider,
    // ширина контроллера
    myWidhtController;

  // функция получения размеров
  function sizeSlider() {
    // получили ширину слайдера
    myWidhtSlider = my_slider.offsetWidth;
    // получили ширину контроллера
    myWidhtController = myWidhtSlider / arrSliderItem.length;
    // получили количество пикселей в одном проценте ширины слайдера
    percentSlider = (myWidhtSlider * (arrSliderItem.length - 1)) / 100;
    // получили количество пикселей в одном проценте ширины контроллера
    percentController = (myWidhtController * (arrSliderItem.length - 1)) / 100;
    // задаем ширину слайдеру
    sliderList.style.width = arrSliderItem.length * myWidhtSlider + "px";
    // задаем ширину контролу
    control.style.width = myWidhtSlider + "px";
    // задаем ширину контроллеру
    controller.style.width = myWidhtController + "px";
    // вернули все переменные что бы они были доступны везде
    return myWidhtSlider, myWidhtController, percentSlider, percentController;
  }

  // при клике (касании) по слайдеру
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

  // при движении курсора(мыши)
  // слайдер
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
  // контроллер
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

  // доводчик слайдера
  function MoveSlider() {
    // получем отступ слайдера
    let upCord = Number(getComputedStyle(sliderList).marginLeft.replace("px", ""));
    // страховка для ресайза, если отступ после ресайза слишком мольшой
    if (Math.abs(upCord) > (arrSliderItem.length - 1) * myWidhtSlider) {
      upCord = 0
    }
    // проверяем на каждом слайде
    for (let i = 0; i < arrSliderItem.length; i++) {
      // если отступ данного слайда меньше половины ширины слайдера
      if (-(myWidhtSlider / 2) < (upCord + myWidhtSlider * i)) {
        // делаем анимированное движение
        sliderList.style.transition = 250 + "ms margin";
        controller.style.transition = 250 + "ms margin";
        // ставим данный слайд и контроллер в одно положение
        sliderList.style.marginLeft = -myWidhtSlider * i + "px";
        controller.style.marginLeft = myWidhtController * i + "px";
        // после завершения анимации
        return setTimeout(function () {
          // отманяем анимацию
          sliderList.style.transition = "";
          controller.style.transition = "";
        }, 250)
      }
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

  // отслеживание клика или касания по слайдеру
  // клик
  sliderList.addEventListener("mousedown", function (e) {
    mouseTouthDown(e);
  })
  // касание
  sliderList.addEventListener("touchstart", function (e) {
    mouseTouthDown(e);
  })
  // клик, касание по контроллеру
  controller.addEventListener("mousedown", function (e) {
    mouseTouthDownController(e);
  })
  controller.addEventListener("touchstart", function (e) {
    mouseTouthDownController(e);
  })
  // отслеживаем движение курсора или пальца по слайдеру
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
    MoveSlider();
  })
  document.addEventListener("touchend", function () {
    // поднятие пальца при движение слайдера
    mouseToucthUp();
    // доводчик слайдера
    MoveSlider();
  })

  // отслеживаем ресайз
  window.addEventListener("resize", function () {
    // заново получаем размеры слайдера
    sizeSlider();
    MoveSlider();
  })
  // получаем все размеры слайдера
  sizeSlider();

  // помечаем айтемы
  for (let i = 0; i < arrSliderItem.length; i++) {
    // добавляем отрибут data-count со значением индекса "i"
    arrSliderItem[i].setAttribute("data-count", i);
  }

  window.addEventListener("keyup", function (e) {
    e = e || event;
    // если нажал на таб и есть ссылка в фокусе в слайдере
    if (e.keyCode == 9 && my_slider.querySelector("a:focus")) {
      // получили слайд с сылкой в фокусе
      let itemSlider = e.target.parentNode.parentNode,
        // получили метку слайда
        dataCount = itemSlider.getAttribute("data-count");
      // получили значение на сколько сдвинулись слайды
      let xTranslate = myWidhtSlider * dataCount;
      // если координата "x" открытого слайда не совпадает с координатой "x" самого слайдера
      if (itemSlider.getBoundingClientRect().x != my_slider.getBoundingClientRect().x) {
        // вычисляем разницу и добавляем к xTranslate
        xTranslate = myWidhtSlider * dataCount - (itemSlider.getBoundingClientRect().x - my_slider.getBoundingClientRect().x) * dataCount;
      }
      // вернули слайды на место
      sliderList.style.transform = "translateX(" + xTranslate + "px)";
      // показали нужный слайд
      sliderList.style.marginLeft = -myWidhtSlider * dataCount + "px";
      // поставили контроллер на место
      controller.style.marginLeft = myWidhtController * dataCount + "px";
    }
  })
}