(function(document, window, $, undefined) {
    (function() {
        return consultas = {
            
            init: function() {
                this.consultarFibras();
                this.consultarQuimicosPrepAux();
                this.consultarPreparaciones();
            },
            
            consultarFibras: function() {
                
                $.get("../../../ServletFibras", function(response) {
                    frmPreparacion.cargarDatos(response, "f");
                    //frmAuxiliares.cargarDatos(response, "f");
                });
            },
            
            consultarQuimicosPrepAux: function() {
                
                $.get("../../../ServletProdFormulacion", {accion: "quimicos"}, function(response) {
                    frmPreparacion.cargarDatos(response, "q");
                    //frmAuxiliares.cargarDatos(response, "q");
                });
            },
            
            consultarPreparaciones: function() {
                
                $.get("../../../ServletPreparaciones", {accion: "buscar"}, function(response) {
                    frmPreparacion.cargarDatos(response, "pr");
                });
            },
            
            consultarNombrePreparacion: function(nombre) {
                $.ajax({
                    url: '../../../ServletPreparaciones',
                    type: 'GET',
                    dataType: 'text',
                    data: {
                        accion: 'buscarNombre',
                        nombre: nombre
                    },
                    success: function(data) {
                        var response = JSON.parse(data);
                        frmPreparacion.agregarPreparacion(response);
                    },
                    error: function(response, status, er) {
                        console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });
            },
            
            guardarNuevaPreparacion: function(datos) {
                
                $.ajax({
                    url: "../../../ServletPreparaciones",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        accion: "guardar",
                        datos: JSON.stringify(datos)
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    
                    success: function(response) {
                        var data = JSON.parse(response);
                        
                        if (data[0].resp) {
                            $.gritter.add({
                                title: "Registro Guardado",
                                text: "¡Se ha guardado satisfactoriamente!",
                                class_name: "growl-success",
                                sticky: false,
                                time: ""
                            });
                            frmPreparacion.cargarDatos(response, "npr");
                            
                        } else {
                            $.gritter.add({
                                title: "Registro No Guardado",
                                text: "¡No se ha guardado el registro!",
                                class_name: "growl-danger",
                                sticky: false,
                                time: ""
                            });
                        }
                        
                    },
                    error: function(response, status, er) {
                        
                        $.gritter.add({
                            title: "Problema con la Aplicación",
                            text: "error: " + response + " status: " + status + " er:" + er,
                            class_name: "growl-danger",
                            sticky: false,
                            time: ""
                        });
                        
                        //console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });
            }
        };
    })();

    consultas.init();

})(document, window, jQuery)