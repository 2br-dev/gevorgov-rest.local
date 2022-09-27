<?php


$name = isset( $_POST['name'] ) ? $_POST['name'] : null;
$phone = isset( $_POST['phone'] ) ? $_POST['phone'] : null;
$date = isset( $_POST['date'] ) ? $_POST['date'] : null;
$count = isset( $_POST['count'] ) ? $_POST['count'] : null;

if ( !$name || !$phone || !$date || !$count ){
	echo(
		json_encode(
			array(
				'success' => false, 
				'message' => 'Не заполнены обязательные поля!'
			), JSON_UNESCAPED_UNICODE
		)
	);
	die();
}


$name = htmlspecialchars( strip_tags( $name ) );
$phone = htmlspecialchars( strip_tags( $phone ) );
$date = htmlspecialchars( strip_tags( $date ) );
$count = htmlspecialchars( strip_tags( $count ) );

if (!is_numeric($count)){
	echo(
		json_encode(
			array(
				'success' => false, 
				'message' => 'Неверное количество персон!'
			), JSON_UNESCAPED_UNICODE
		)
	);
	die();
}

$message = "Здравствуйте! Меня зовут $name. Я прошу забронировать столик на $date на $count персон. Пожалуйста, свяжитесь со мной по телефону $phone для уточнения деталей.";


$to = "masterkadaj@gmail.com";
$subject = "Заказ столика в ресторане Геворговъ Rest";

if( !mail($to, $subject, $message)){
	echo (
		json_encode(
			array(
				'success' => false, 
				'message' => 'Ошибка отправки сообщения!'
			), JSON_UNESCAPED_UNICODE
		)
	);
	
}else{
	echo (
		json_encode(
			array(
				'success' => true, 
				'message' => 'Спасибо за Ваш заказ, мы свяжемся с Вами в ближайшее время!'
			), JSON_UNESCAPED_UNICODE
		)
	);
}