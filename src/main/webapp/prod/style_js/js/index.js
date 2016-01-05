(function (document, window, $, undefined){
    (function (){
        return index = {
            //variables: "",
            //URLgetUser: "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getUser",
            $txtUser: $("#UserSignIn"),
            $txtPass: $("#PassSignIn"),
            $btnIngresar: $("#ingresar"),
            $modalMensaje: $("#myModal"),
            $tituloMensaje: $("#myModalLabel"),
            $cuerpoMensaje: $("#cuerpoMensaje"),  
            
            init: function (){
                this.consultarUsuario();
            },
            
            consultarUsuario: function (){
                var self = this;
                
                self.$txtUser.val("");
                self.$txtPass.val("");
                
                self.$btnIngresar.on("click", function (e) {
                    e.preventDefault();
                    
                    
                    $.post( "ServletLogin", 
                        {
                            UserSignIn: self.$txtUser.val(),
                            PassSignIn: self.$txtPass.val()
                        }, function(response){
                            window.location = response;
                        });
                    
                   /*$.ajax( "ServletLogin", {
                       type: "POST",
                       data: {UserSignIn: self.$txtUser.val(), PassSignIn: self.$txtPass.val()} 
                   })
                   .done( function(responseText) {
                       console.log(responseText);
                       
                        if (data.find) {
                           localStorage.setItem("uss", JSON.stringify(data));
                           window.location = "/Prueba/dashboard/menu.jsp";
                       }else{
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
                    })
                    .fail( function(err) {
                        try {
                            self.$tituloMensaje.text("Conexión con el servidor");
                            self.$cuerpoMensaje.text("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                            self.$modalMensaje.modal("show");
                            self.$txtUser.val("");
                            self.$txtPass.val("");
                        } catch (e) {
                            alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                            self.$txtUser.val("");
                            self.$txtPass.val("");
                        }
                    });*/
                });
            }
        };
    })();    
    index.init();

})(document, window, jQuery);