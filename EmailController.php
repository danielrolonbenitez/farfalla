<?php

require_once(dirname(__FILE__)."/PHPMailer/phpmailer.php");

require_once(dirname(__FILE__)."/PHPMailer/class.smtp.php");

//error_reporting(-1);

class EmailController{



    var $mailer;

  

    public function __construct(){  



        $this->mailer = new PHPMailer();

        //$this->mailer->SMTPDebug = SMTP::DEBUG_SERVER; 

        $this->mailer->IsSMTP(); // telling the class to use SMTP

        $this->mailer->IsHTML(true); // Envio tipo HTML

        //$this->mailer->SMTPAuth = true;

        //$this->mailer->SMTPSecure = 'ssl';

        $this->mailer->Port = 25;

        $this->mailer->Priority = 1; // ******** PRIORIDAD *******

        $this->mailer->Host ="mail.farfallapromociones.com.ar"; //Modificar por el host de salida
        $this->mailer->Username ="rrhh@farfallapromociones.com.ar";    // SMTP username -- CHANGE --
        $this->mailer->Password ="disnetweb5146";    // SMTP password -- CHANGE --


        $this->mailer->CharSet = 'utf-8'; 

        $this->mailer->WordWrap =50;

      }



    public function enviaEmail($from,$mensaje,$asunto,$des,$files){

         //return var_dump($files);exit(); 

       

         $from=$from;

         $fromEmail=$from;

        

        $this->mailer->Subject = $asunto;

        $this->mailer->ClearAllRecipients();

        $this->mailer->setFrom($fromEmail, $from); 



        if(count($des)>0){   

              foreach($des as $destinatario){

                $this->mailer->AddAddress($destinatario);

              }

            }else{

                $this->mailer->AddAddress($fromEmail);

                $mensaje="error en la direccion de email al enviar el email.";

              }

             $this->mailer->Body = $mensaje;

              if($files){
               
                $i=0;
                foreach($files as $file){
                   
                   //return var_dump($file);exit(); 

                  $file_tmp  = $file['tmp_name'][$i];

                  $file_name = $file['name'][$i];

                  $this->mailer->AddAttachment($file_tmp, $file_name);
                  $i++;
                  }
              }





            $send=$this->mailer->send();

          if($send==false){

            return "Failed: ".$this->mailer->ErrorInfo;

        }else{

              return 1;

               }

        



            

    }

    

}



?>

