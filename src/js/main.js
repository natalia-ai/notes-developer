window.onload = function () {

  // фон на canvas
  // bdCanvas.js
  bdCanvas();

  // удаляю класс no-js
  // noJs.js
  noJs();

  // вызов всех слайдеров
  this.slider( this.document.querySelector(".slider_1-js") );
  this.slider( this.document.querySelector(".slider_2-js") );
};
