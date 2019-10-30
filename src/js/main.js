window.onload = function () {

  // фон на canvas
  // bdCanvas.js
  bdCanvas();

  // удаляю класс no-js
  // noJs.js
  noJs();

  // вызов всех слайдеров
  slider( document.querySelector(".slider_1-js") );
  slider( document.querySelector(".slider_2-js") );
  slider( document.querySelector(".slider_3-js") );

  // вызов всплывающего окна
  popupContact ();

  // скролл 
  myScroll ();
};
