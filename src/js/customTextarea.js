function customTextarea() {
  // получаем поле ввода и вспомогательный блок
  var 
    textarea = document.querySelector("textarea"),
    block = document.querySelector(".for_textarea");
    // при нажатии на клавишу
    textarea.addEventListener("keyup", function() {
      // получаем значение поля ввода
      var val_text = textarea.value;
      // c помощью регулярных выражений заменм некоторые символы
      val_text = val_text.replace(/ /g, "&nbsp;");
      val_text = val_text.replace(/<|>/g, "_");
      // полученное выражение добавим в вспомогательный блок
      block.innerHTML = val_text;
      // получаем высоту вспомогательного блока
      height_textarea = block.offsetHeight;
      
      // задаем высоту для текстового поля
      textarea.style.height = height_textarea + "px";
    })
}