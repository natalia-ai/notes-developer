<?php
if(isset($_POST["name"])) {
	$name = $_POST["name"];
	$tel = $_POST["tel"];
	$review = "Нет дополнительного сообщения";
	if(isset($_POST["review"])) {
		$review =  htmlspecialchars($_POST["review"], ENT_QUOTES);
	}
	// отправка почты
	$to  = "<uzinok@yandex.ru>, " ;
	
	$subject = "Uznok.ru"; 
	
	$message = "Имя: $name<br>Телефон: $tel<br> Дополнительное сообщение:<br> $review";
	
	$headers  = "Content-type: text/html; charset=UTF-8 \r\n"; 
	$headers .= "From: no-reply@uzinok.ru <uzinok.ru>\r\n"; 
	
	if(mail($to, $subject, $message, $headers)) {
		echo "Ваше сообщение отправлено!";
	} else {
		echo "Ошибка при отправке сообщения";
	}
	// \отправка почты
	// echo $name . "-" . $tel . "-" .	$raion . "-" .	$service . "-" .	$review;
} else {
	echo "нет данных";
}
?>