function myScroll() {

  // получаем ссылки
  let arrLincks = document.querySelectorAll(".header__nav a");

  // перебираем ссылки
  for (let i = 0; i < arrLincks.length; i++) {

    // блок к которому скролим
    let goScroll = document.querySelector(arrLincks[i].getAttribute("href"));

    // клик по ссылке
    arrLincks[i].addEventListener("click", function (e) {

      e = e || event;

      // отьеняем по умолчанию
      e.preventDefault();

      return handleLinkClick(goScroll);
    })
  }
  // \перебираем ссылки
  
    // функция скролла
    function handleLinkClick(goScroll) {
      console.log(goScroll);

      return goScroll.scrollIntoView(
        {
        block: "start",
        behavior: "smooth"
      }
      );
    }

}