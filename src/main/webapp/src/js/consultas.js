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
            
            consultarNombrePreparacion: function(nombre, tipo, idPrep) {
                $.ajax({
                    url: '../../../ServletPreparaciones',
                    type: 'GET',
                    dataType: 'text',
                    data: {
                        accion: 'buscarNombre',
                        tipo: tipo,
                        idPrep: idPrep,
                        nombre: nombre
                    },
                    success: function(data) {
                        var response = JSON.parse(data);
                        if (tipo === 'nuevo') {
                            frmPreparacion.agregarPreparacion(response);
                        } else if (tipo === 'editar') {
                            frmPreparacion.solicitarModificarPreparacion(response);
                        }
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
            },
            
            verificarEstadoModificacion: function(idMaestro, formulario){
                var servlet = '';
                
                if (formulario === 'frmPrep') {
                    servlet = '../../../ServletPreparaciones';
                } else if (formulario === 'frmAux') {
                    servlet = '../../../';
                }
                
                $.ajax({
                    url: servlet,
                    type: "GET",
                    dataType: 'json',
                    data: {
                        accion: 'verificarModificacion',
                        //dato: dato,
                        idMaestro: idMaestro
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    success: function(response){
                            if (formulario === 'frmPrep') {
                                frmPreparacion.cargarDatos(response, "solic");
                            } else if (formulario === 'frmAux') {
                                //frmAuxiliares.eliminarLineaPrepFormEdicion(true, fila);
                            }
                    },
                    error: function(response, status, er) {
                        $.gritter.add({
                            title: "Problema con la Aplicación",
                            text: "error: " + response + " status: " + status + " er:" + er,
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                });

            },
            
            solicitarModificarPreparacion: function(datos, btnCerrar) {
                
                $.ajax({
                    url: "../../../ServletPreparaciones",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        accion: "editarPreparacion",
                        datos: JSON.stringify(datos)
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    
                    success: function(response) {
                        
                        if (response === 'true') {
                            $.gritter.add({
                                title: "Modificar Registro",
                                text: "¡Solicitud enviada con éxito.!",
                                class_name: "growl-info",
                                sticky: false,
                                time: ""
                            });
                            $(btnCerrar).click();
                            //frmPreparacion.cargarDatos(response, "npr");
                            
                        } else {
                            $.gritter.add({
                                title: "Modificar Registro",
                                text: "¡ No se entregó la solicitud de modificación.!",
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
                            class_name: "growl-warning",
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