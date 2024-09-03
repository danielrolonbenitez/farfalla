<?php 

//var_dump($cursos);die;

$baseUrl='https://elfiko.com/portfolio/falabela'; ?>

<!DOCTYPE html>

<html lang="es">

<head>



	<title></title>

	<meta charset="utf-8">

<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="description" content="">

<meta name="author" content="">

<meta name="keywords" content="">

<meta property="og:url"                content="https://myayudamutua.nextiendas.com/contacto" />

<meta property="og:type"               content="article" />

<meta property="og:title"              content="myayudamutua" />

<meta property="og:image"              content="https://myayudamutua.nextiendas.com/uploads/favicons/d250d08602a209c8d4f4459c2ca5a814.jpg" />

<style type="text/css">

    :root{

        --color-primary:#0A95B4;

        --color-header:#ffffff;

        --color-footer:#000000;

        --color-border-hover:#f7921e;

        --color-text:#0A95B4;

        --color_text_footer:#ffffff;

        --color-text-hover:#000000;

        --font-customize: Lato;

        --color-text-opacity:#ffffff36;

    }

</style>

<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/fontawesome-5/css/all.css" rel="stylesheet">



<link href="<?php echo $baseUrl;?>/assets/frontend/css/owl.theme.default.css" rel="stylesheet"/>

<link href="<?php echo $baseUrl;?>/assets/frontend/css/animate.css" rel="stylesheet"/>

<link href="<?php echo $baseUrl;?>/assets/frontend/css/bootstrap.min.css" rel="stylesheet"/>

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/fancybox/jquery.fancybox.css?v=2.1.5" rel="stylesheet" type="text/css" media="screen" />

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/jssor/jssor.css" rel="stylesheet" />

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/bootstrapvalidator/css/bootstrapValidator.css" rel="stylesheet"/>

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/template/general_styles.css?v=1696367722" rel="stylesheet" />

<link href="<?php echo $baseUrl;?>/assets/frontend/css/style.css?v=1696551642" rel="stylesheet" />

<link href="<?php echo $baseUrl;?>/assets/frontend/extras/template9/template9_extra.css?v=1693594080" rel="stylesheet"/>

<script src="<?php echo $baseUrl;?>/assets/frontend/js/jquery.min.js"></script>

<link href="<?php echo $baseUrl;?>/assets/backend/bower_components/select2/dist/css/select2.min.css" rel="stylesheet"/>

<link href="<?php echo $baseUrl;?>/assets/stores/css/style-20f07591c6fcb220ffe637cda29bb3f6.css?v=1701282175" rel="stylesheet">

<link href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>

<style type="text/css">

  .requ{

    color: orange !important

  }



</style>	

	</head>

<body>

<div id="contentMain">

	 <section>

  <div class="container pt-5 pb-5">

    <div class="row d-flex justify-content-center">  

    <div class="col-md-12  contact">

       

            <form id='form' action='enviar.php'  method="post" role="form" class="form-contact" enctype='multipart/form-data'>

        <h5 class="font-weight-bold">Contacto</h5>
        <br>
 



        <h6>Nombre<span class='requ'>*</span></h6>

        <div class="form-group">

          <input type="text" class="form-control contact" id="
          Nombre" name="nombre" placeholder="Nombre" required>
        </div>

        <h6>Apellido<span class='requ'>*</span></h6>

        <div class="form-group">

          <input type="text" class="form-control contact" id="apellido" name="apellido" placeholder="Apellido" required>

        </div>

 

         <h6>Email<span class='requ'>*</span></h6>                 

        <div class="form-group">

            <input type="email" class="form-control contact" id="email" name="email" placeholder="Email" required>

        </div>     

         

         <h6>Tel&eacute;fono<span class='requ'>*</span></h6>                 

        <div class="form-group">

            <input type="text" class="form-control contact" id="telefono" name="telefono" placeholder="Telefono" required>

        </div> 
        
        <h6>Archivos<span class='requ'>*</span></h6>
        <h6>Foto cv<span class='requ'>*</span></h6>                 

        <div class="form-group">

            <input type="file" class="form-control contact" id="files" name="files[]" required multiple accept=".doc,.docx,.pdf">

        </div> 
        <br/>

       

         

        <div class="text-center">

          <div class="row">

            <div class="col-md-4 offset-md-4">

              <div class="form-group boton-enviar">

                <button type="submit"  class="btn-block rounded btn angulo-item-button">Enviar</button>

              </div>

            </div>

          </div>

        </div>

      </form>

       <?php if(isset($_GET['enviado'])){ ?>

        <div id='send'  class="alert alert-info">

          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>

          <i class=""></i> Su mensaje fue enviado correctamente, pronto nos pondremos en contacto.

        </div>

      <?php } ?>

    </div>

  </div>

</section>

<script>

$(document).ready(function(){



          

       });

</script>  

</body>

</html>