<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="src/images/favicon.ico">

        <title>ERP Teñimos S.A.</title>

        <link href="src/css/style.default.css" rel="stylesheet">
    </head>

    <body class="signin">
        <!-- Preloader -->
        <div id="preloader">
            <div id="status"><i class="fa fa-spinner fa-spin"></i></div>
        </div>

        <section>
            <div class="signinpanel">
                <div class="row">
                    <div class="col-md-7">
                        <div class="signin-info">
                            <div class="logopanel">
                                <h1><span>[</span> Teñimos S.A. <span>]</span></h1>
                            </div><!-- logopanel -->

                            <div class="mb20"></div>

                            <h5><strong>Bienvenido!</strong></h5>                            
                        </div><!-- signin0-info -->
                    </div><!-- col-sm-7 -->

                    <div class="col-md-5">
                        <form method="post" id="frmSignIn">
                            <h4 class="nomargin">Ingresar</h4>
                            <p class="mt5 mb20">Accede con tu código y contraseña</p>

                            <input type="text" class="form-control uname" placeholder="Usuario" id="UserSignIn" name="UserSignIn"/>
                            <input type="password" class="form-control pword" placeholder="Password" id="PassSignIn" name="PassSignIn"/>
                            <!--<a href="#"><small>Olvido su contraseña?</small></a>-->
                            <button class="btn btn-success btn-block" id="ingresar">Ingresar</button>
                        </form>
                    </div><!-- col-sm-5 -->
                </div><!-- row -->

                <!--<div class="signup-footer">
                    <div class="pull-left">
                        &copy; 2014. All Rights Reserved. Bracket Bootstrap 3 Admin Template
                    </div>
                    <div class="pull-right">
                        Created By: <a href="http://themepixels.com/" target="_blank">ThemePixels</a>
                    </div>
                </div>-->
            </div><!-- signin -->
        </section>
        
        <!-- Modal -->
        <jsp:include page="src/views/modal.alert/modalMensajeAlert.jspf" />
        <jsp:include page="src/views/recuperarpass/recuperarpass.jspf" />
        
        <script src="src/js/lib/jquery-1.10.2.min.js"></script>
        <script src="src/js/lib/jquery-migrate-1.2.1.min.js"></script>
        <script src="src/js/lib/bootstrap.min.js"></script>
        <script src="src/js/lib/modernizr.min.js"></script>
        <script src="src/js/lib/retina.min.js"></script>

        <script src="src/js/lib/custom.js"></script>
        
        <script src="src/js/index.js"></script>

    </body>
</html>
