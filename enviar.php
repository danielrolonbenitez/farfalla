<?php

    include('EmailController.php');

    ini_set( 'display_errors', 1 );

    error_reporting( E_ALL );

    $from = $_POST['email'];

    $des = array($_POST['email']);

    $subject = "Nuevo mensaje de contacto";

    $body="<h5 class='font-weight-bold'>Datos del Contacto</h5><br/>";


       $body.="Nombre: ".$_POST['nombre'].'<br/>';

        $body.="Apellido: ".$_POST['apellido'].'<br/>';

        $body.="Email: ".$_POST['email'].'<br/>';

        $body.="Telefono: ".$_POST['telefono'].'<br/>';
        

    $mensaje=$body;

    //var_dump($_FILES);die;

    $email= New EmailController();

	 $result=$email->enviaEmail($from,$mensaje,$subject,$des,$_FILES);

	if($result==1){

	    header("Location:form.php?enviado=1");

	}else{

	    echo "error al enviar el formulario";

	}



?>