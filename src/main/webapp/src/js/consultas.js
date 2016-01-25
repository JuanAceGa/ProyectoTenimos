(function(document, window, $, undefined) {
    (function() {
        return consultas = {
            
            init: function() {
                this.consultarFibras();
                this.consultarQuimicosPrepAux();
                this.consultarMaestros();
            },
            
            consultarFibras: function() {
                
                $.get("../../../ServletFibras", function(response) {
                    frmPreparacion.cargarDatos(response, "f");
                    frmAuxiliar.cargarDatos(response, 'f');
                });
            },
            
            consultarQuimicosPrepAux: function() {
                
                $.get("../../../ServletProdFormulacion", {accion: "quimicos"}, function(response) {
                    frmPreparacion.cargarDatos(response, "q");
                    frmAuxiliar.cargarDatos(response, "q");
                });
            },
            
            consultarMaestros: function() {
                
                $.get("../../../ServletPreparaciones", {accion: "buscar"}, function(response) {
                    frmPreparacion.cargarDatos(response, "pr");
                });
                
                $.get("../../../ServletAuxiliares", {accion: "buscar"}, function(response) {
                    frmAuxiliar.cargarDatos(response, "au");
                });
            },
            
            consultarNombreMaestros: function(nombre, tipo, idMaestro, servlet) {
                
                $.ajax({
                    url: '../../../' + servlet,
                    type: 'GET',
                    dataType: 'text',
                    data: {
                        accion: 'buscarNombre',
                        tipo: tipo,
                        idMaestro: idMaestro,
                        nombre: nombre
                    },
                    success: function(data) {
                        var response = JSON.parse(data);
                        if (tipo === 'nuevo') {
                            
                            if (servlet === 'ServletPreparaciones') {
                                frmPreparacion.agregarPreparacion(response);
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.agregarAuxiliar(response);
                            }
                            
                        } else if (tipo === 'editar') {
                            
                            if (servlet === 'ServletPreparaciones') {
                                frmPreparacion.solicitarModificarPreparacion(response);
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.solicitarModificarAuxiliar(response);
                            }
                        }
                    },
                    error: function(response, status, er) {
                        console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });
            },
                      
            guardarNuevoMaestro: function(datos, servlet) {
                $.ajax({
                    url: '../../../' + servlet,
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
                            
                            if (servlet === 'ServletPreparaciones') {
                                frmPreparacion.cargarDatos(response, "npr");
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.cargarDatos(response, "nau");
                            }
                            
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
                    servlet = '../../../ServletAuxiliares';
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
                                frmPreparacion.cargarDatos(response, 'solic');
                            } else if (formulario === 'frmAux') {
                                frmAuxiliar.cargarDatos(response, 'solic');
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
            
            solicitarModificarMaestro: function(datos, btnCerrar, servlet) {
                
                $.ajax({
                    url: '../../../' + servlet,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        accion: "editarMaestro",
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