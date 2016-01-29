(function (document, window, $, undefined){
    (function (){
        return index = {
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

                    $.post("ServletUsuario", {UserSignIn: self.$txtUser.val(), PassSignIn: self.$txtPass.val()}, function(response) {

                        if (!$.isEmptyObject(response)) {
                            var json = JSON.parse(response);
                            sessionStorage.user = JSON.stringify(json);
                            window.location = json.url;
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