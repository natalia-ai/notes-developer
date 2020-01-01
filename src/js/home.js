window.onload = function () {

  // фон на canvas
  // bdCanvas.js
  bdCanvas();

  // удаляю класс no-js
  // noJs.js
  noJs();

  // вызов всех слайдеров
  // slider( document.querySelector(".slider_1-js") );

  let arrSliders = this.document.querySelectorAll(".slider-wrap");

  for (let i = 0; i < arrSliders.length; i++) {
    slider( arrSliders[i] );
  }

  // вызов всплывающего окна
  popupContact ();

  // скролл 
  myScroll ();

  // валидация формы
  orderForm();
};
