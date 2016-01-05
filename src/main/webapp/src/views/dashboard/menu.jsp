<%-- 
    Document   : menu
    Created on : 26/11/2015, 04:23:17 PM
    Author     : jacevedo
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="com.co.tenimos.entities.Usuarios"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="shortcut icon" href="../../../style_js/images/favicon.ico">

        <title>ERP Teñimos S.A.</title>

        <link href="../../../style_js/css/style.default.css" rel="stylesheet">
        <link href="../../../style_js/css/jquery.gritter.css" rel="stylesheet">
        <link href="../../../style_js/css/jquery.datatables.css" rel="stylesheet">
        <link href="../../../style_js/css/display.css" rel="stylesheet">
        <link href="../../../style_js/css/datatable-align-text.css" rel="stylesheet">
    </head>

    <body>
        <!-- Preloader -->
        <div id="preloader">
            <div id="status">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </div>

        <section>
            <div class="leftpanel">
                <div class="logopanel">
                    <h1>
                        <span>[</span> Teñimos S.A. <span>]</span>
                    </h1>
                </div><!-- logopanel -->

                <div class="leftpanelinner">
                    <!-- This is only visible to small devices -->
                    <div class="visible-xs hidden-sm hidden-md hidden-lg">   
                        <div class="media userlogged">
                            <!--<img alt="" src="images/photos/loggeduser.png" class="media-object">-->
                            <div class="media-body">
                                <h4 id="nomUser2">John Doe</h4>
                                <!--<span>"Life is so..."</span>-->
                            </div>
                        </div>

                        <h5 class="sidebartitle actitle">Cuenta</h5>
                        <ul class="nav nav-pills nav-stacked nav-bracket mb30">
                            <li>
                                <a href="#"><i class="fa fa-user"></i> <span>Mi Perfil</span></a></li>
                            <li>
                                <a href="#"><i class="fa fa-cog"></i> <span>Configuración de Cuenta</span></a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-question-circle"></i> <span>Ayuda</span></a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-sign-out"></i> <span>Cerrar Sesión</span></a>
                            </li>
                        </ul>
                    </div>

                    <h5 class="sidebartitle">Navegación</h5>
                    <ul class="nav nav-pills nav-stacked nav-bracket" id="nav">
                        <li class="active">
                            <a href="#"><i class="fa fa-home"></i><span>Dashboard</span></a></li>
                        <li><a href="#"><i class="fa fa-envelope-o"></i><span>Email</span></a></li>
                        <li class="nav-parent" id="navLab"><a href="#"><i class="fa fa-edit"></i><span>Laboratorio</span></a>
                            <ul class="children" >
                                <li><a href="#"><i class="fa fa-caret-right"></i>Maestro Preparación</a></li>
                                <li><a href="#"><i class="fa fa-caret-right"></i>Maestro Auxiliares</a></li>
                                <li><a href="#"><i class="fa fa-caret-right"></i>Maestro Procesos Posteriores</a></li>
                                <li><a href="#"><i class="fa fa-caret-right"></i>Maestro Fibras</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- leftpanelinner -->
            </div><!-- leftpanel -->

            <div class="mainpanel">
                <div class="headerbar">
                    <a class="menutoggle">
                        <i class="fa fa-bars"></i>
                    </a>
                    <!--<form class="searchform" action="http://themepixels.com/demo/webpage/bracket/index.html" method="post">
                        <input type="text" class="form-control" name="keyword" placeholder="Search here..." />
                    </form>-->

                    <div class="header-right">
                        <ul class="headermenu">
                            <li>
                                <div class="btn-group">
                                    <button class="btn btn-default dropdown-toggle tp-icon" data-toggle="dropdown">
                                        <i class="glyphicon glyphicon-envelope"></i>
                                        <span class="badge"></span><!-- Aquí va el número de correos recibidos -->
                                    </button>
                                    <!--<div class="dropdown-menu dropdown-menu-head pull-right">
                                        <h5 class="title">Tiene 5 Mensajes Nuevos</h5>
                                        <ul class="dropdown-list gen-list">
                                            <li class="new">
                                                <a href="#">
                                                    <span class="thumb">
                                                        <img src="images/photos/user1.png" alt="" />
                                                    </span>
                                                    <span class="desc">
                                                        <span class="name">Draniem Daamul <span class="badge badge-success">nuevo</span></span>
                                                        <span class="msg">Lorem ipsum dolor sit amet...</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="thumb">
                                                        <img src="images/photos/user2.png" alt="" />
                                                    </span>
                                                    <span class="desc">
                                                        <span class="name">Nusja Nawancali <span class="badge badge-success">nuevo</span></span>
                                                        <span class="msg">Lorem ipsum dolor sit amet...</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="thumb">
                                                        <img src="images/photos/user3.png" alt="" />
                                                    </span>
                                                    <span class="desc">
                                                        <span class="name">Weno Carasbong <span class="badge badge-success">nuevo</span></span>
                                                        <span class="msg">Lorem ipsum dolor sit amet...</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="thumb">
                                                        <img src="images/photos/user4.png" alt="" />
                                                    </span>
                                                    <span class="desc">
                                                        <span class="name">Zaham Sindilmaca <span class="badge badge-success">nuevo</span></span>
                                                        <span class="msg">Lorem ipsum dolor sit amet...</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="thumb">
                                                        <img src="images/photos/user5.png" alt="" />
                                                    </span>
                                                    <span class="desc">
                                                        <span class="name">Veno Leongal <span class="badge badge-success">nuevo</span></span>
                                                        <span class="msg">Lorem ipsum dolor sit amet...</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="new"><a href="#">Leer todos los Mensajes</a></li>
                                        </ul>
                                    </div>-->
                                </div>
                            </li>
                            <li>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <img src="../../../style_js/images/photos/loggeduser.png" alt="" />
                                        <span id="nomUser">John Doe</span>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                                        <li>
                                            <a href="#"><i class="glyphicon glyphicon-user"></i>Mi Perfil</a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="glyphicon glyphicon-cog"></i>Configurar Cuenta</a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="glyphicon glyphicon-question-sign"></i>Ayuda</a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="glyphicon glyphicon-log-out"></i>Cerrar Sesión</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div><!-- header-right -->
                </div><!-- headerbar -->

                <div class="pageheader">
                    <h2 id="ubicacionActual">
                        <i class="fa fa-home"></i>Dashboard <!--<span>Subtítulos van aquí...</span>-->
                    </h2>
                    <!--<div class="breadcrumb-wrapper">
                        <span class="label">Usted está aquí:</span>
                        <ol class="breadcrumb">
                            <li>Teñimos S.A. <!--<a href="index.html"></a></li>
                            <li class="active">Dashboard</li>
                        </ol>
                    </div>-->
                </div>

                <div class="contentpanel" id="contenido">
                    <jsp:include page="../forms/laboratorio/frmpreparacion.jspf"></jsp:include>
                    <jsp:include page="../forms/laboratorio/frmauxiliares.jspf"></jsp:include>
                </div><!-- contentpanel -->
            </div><!-- mainpanel -->
        </section>
        
        <!-- Modal -->
        <jsp:include page="../modal.alert/modalMensajeAlert.jspf"></jsp:include>
        
        <script src="../../../style_js/js/lib/jquery-1.10.2.min.js"></script>
        <script src="../../../style_js/js/lib/code.jquery.com-jquery-1.11.3.min.js"></script>
        <script src="../../../style_js/js/lib/jquery-migrate-1.2.1.min.js"></script>
        <script src="../../../style_js/js/lib/bootstrap.min.js"></script>
        <script src="../../../style_js/js/lib/modernizr.min.js"></script>
        <script src="../../../style_js/js/lib/jquery.sparkline.min.js"></script>
        <script src="../../../style_js/js/lib/toggles.min.js"></script>
        <script src="../../../style_js/js/lib/retina.min.js"></script>
        <script src="../../../style_js/js/lib/jquery.cookies.js"></script>
        <script src="../../../style_js/js/lib/jquery.gritter.min.js"></script>

        <script src="../../../style_js/js/lib/morris.min.js"></script>
        <script src="../../../style_js/js/lib/raphael-2.1.0.min.js"></script>

        <script src="../../../style_js/js/lib/chosen.jquery.min.js"></script>

        <script src="../../../style_js/js/lib/jquery.validate.min.js"></script>
        
        <script src="../../../style_js/js/lib/custom.js"></script>
        <script src="../../../style_js/js/lib/datatables.min.js"></script>
        <script src="../../../style_js/js/lib/jquery-inputformat.min.js"></script>

        <script src="../../../style_js/js/consultas.js"></script>
        <script src="../../../style_js/js/camposObligatorios.js"></script>
        <script src="../../../style_js/js/frmPreparacion.js"></script>
        <!--<script src="../../../style_js/js/frmAuxiliares.js"></script>-->
        <script src="../../../style_js/js/dashboard.js"></script>
    </body>
</html>
