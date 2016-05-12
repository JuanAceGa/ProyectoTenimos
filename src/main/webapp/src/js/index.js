(function (document, window, $, undefined){
    (function (){
        return index = {
            UrlUsuario: 'http://localhost:8084/ERPTenimosBackend/rest/usuario/',
            $txtUser: $("#UserSignIn"),
            $txtPass: $("#PassSignIn"),
            $btnIngresar: $("#ingresar"),
            $modalMensaje: $("#myModal"),
            $tituloMensaje: $("#myModalLabel"),
            $cuerpoMensaje: $("#cuerpoMensaje"),
            $recPass: $('#frmSignIn').find('a'),
            $modalRecPass: $('#recPass'),
            $txtRecPassIdUser: $('#idUser'),
            $txtRecPassIdentUser: $('#identUser'),
            $btnRecPassEnviar: $('#btnEnviar'),
            
            init: function (){
                this.consultarUsuario();
                this.recuperarContraseña();
            },
            
            consultarUsuario: function() {
                var self = this;
                
                self.$txtUser.val("");
                self.$txtPass.val("");
                
                self.$btnIngresar.on("click", function(e) {
                    e.preventDefault();

                    $.ajax(self.UrlUsuario + 'login', {
                        type: 'POST',
                        data: 'codUser=' + self.$txtUser.val() + '&passUser=' + self.$txtPass.val()
                        
                    }).done(function(user){
                        if (!$.isEmptyObject(user)) {
                            sessionStorage.user = JSON.stringify(user);
                            
                            $.get(self.UrlUsuario + 'menu', function(url) {
                                window.location = url;
                            });                            
                        } else {
                            try {
                                self.$tituloMensaje.text("Identificación de usuario");
                                self.$cuerpoMensaje.text("Nombre de usuario o contraseña inválidos.");
                                self.$modalMensaje.modal("show");

                                self.$txtUser.val("");
                                self.$txtPass.val("");
                            } catch (e) {
                                alert("Nombre de usuario o contraseña inválidos.");
                                self.$txtUser.val("");
                                self.$txtPass.val("");
                            }
                        }
                    }).fail(function(err){
                        try {
                            self.$tituloMensaje.text("Conexión con el servidor");
                            self.$cuerpoMensaje.text("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                            self.$modalMensaje.modal("show");
                            self.$txtUser.val("");
                            self.$txtPass.val("");
                        } catch (e) {
                            alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                        }
                    });
                });
            },
            
            recuperarContraseña: function() {
                var self = this;
                
                self.$recPass.on('click', function(e) {
                    e.preventDefault();                   
                    self.$modalRecPass.modal('show');
                });
                
                self.$btnRecPassEnviar.on('click', function(e) {
                    e.preventDefault();
                });
            }
        };
    })();    
    index.init();

})(document, window, jQuery);