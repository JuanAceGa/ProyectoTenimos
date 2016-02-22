(function(document, window, $, undefined) {
    (function() {
        return consultas = {
            
            init: function() {
                this.consultarFibras();
                this.consultarQuimicosPrepAux();
                this.consultarMaestros('');
            },
            
            consultarFibras: function() {
                
                $.ajax({
                    url: '../../../ServletFibras',
                    type: 'GET',
                    dataType: 'text',
                    data: {accion: 'buscar'},
                    success: function(response) {
                        frmPreparacion.cargarDatos(response, 'f');
                        frmAuxiliar.cargarDatos(response, 'f');
                        frmProcPos.cargarDatos(response, 'f');
                        frmFibra.cargarDatos(response, 'f');
                    },
                    error: function(response, status, er) {
                        console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });
                
            },
            
            consultarQuimicosPrepAux: function() {
                
                $.get('../../../ServletProdFormulacion', {accion: 'quimicos'}, function(response) {
                    frmPreparacion.cargarDatos(response, 'q');
                    frmAuxiliar.cargarDatos(response, 'q');
                    frmProcPos.cargarDatos(response, 'q');
                });
            },
            
            consultarMaestros: function(m) {
                
                if (m === '') {
                    $.get('../../../ServletPreparaciones', {accion: 'buscar'}, function(response) {
                        frmPreparacion.cargarDatos(response, 'pr');
                    });

                    $.get('../../../ServletAuxiliares', {accion: 'buscar'}, function(response) {
                        frmAuxiliar.cargarDatos(response, 'au');
                    });

                    $.get('../../../ServletProcesosPost', {accion: 'buscar'}, function(response) {
                        frmProcPos.cargarDatos(response, 'pp');
                    });
                }
                
                if (m === '' || m === 'p') {
                    $.get('../../../ServletProcesos', {accion: 'buscar'}, function(response) {
                        frmProceso.cargarDatos(response, 'pr');
                    });
                }
                
                if (m === '' || m === 'c') {
                    $.get('../../../ServletCurvas', {accion: 'buscar'}, function(response) {
                        frmProceso.cargarDatos(response, 'c');
                        frmCurva.cargarDatos(response, 'c');
                    });
                }
                
                if (m === '' || m === 'lc') {
                    $.get('../../../ServletListaCheck', {accion: 'buscar'}, function(response) {
                        frmListaC.cargarDatos(response, 'lc');
                        frmCurva.cargarDatos(response, 'lc');
                    });
                }
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
                            
                            if (servlet === 'ServletProcesosPost') {
                                frmProcPos.agregarProcPos(response);
                            }
                            
                            if (servlet === 'ServletFibras') {
                                frmFibra.agregarFibra(response);
                            }
                            
                            if (servlet === 'ServletProcesos') {
                                frmProceso.agregarProceso(response);
                            }
                            
                            if (servlet === 'ServletCurvas') {
                                frmCurva.agregarCurva(response);
                            }
                            
                            if (servlet === 'ServletListaCheck') {
                                frmListaC.agregarRegistro(response);
                            }
                            
                        } else if (tipo === 'editar') {
                            
                            if (servlet === 'ServletPreparaciones') {
                                frmPreparacion.solicitarModificarPreparacion(response);
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.solicitarModificarAuxiliar(response);
                            }
                            
                            if (servlet === 'ServletProcesosPost') {
                                frmProcPos.solicitarModificarProcPos(response);
                            }
                            
                            if (servlet === 'ServletFibras') {
                                frmFibra.solicitarModificarFibra(response);
                            }
                            
                            if (servlet === 'ServletCurvas') {
                                frmCurva.solicitarModificarCurva(response);
                            }
                            
                            if (servlet === 'ServletProcesos') {
                                frmProceso.solicitarModificarProceso(response);
                            }
                            
                            if (servlet === 'ServletListaCheck') {
                                frmListaC.solicitarModificarRegistro(response);
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
                                frmPreparacion.cargarDatos(response, 'npr');
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.cargarDatos(response, 'nau');
                            }
                            
                            if (servlet === 'ServletProcesosPost') {
                                frmProcPos.cargarDatos(response, 'npp');
                            }
                            
                            if (servlet === 'ServletFibras') {
                                frmFibra.cargarDatos(response, 'nf');
                            }
                            
                            if (servlet === 'ServletProcesos') {
                                frmProceso.cargarDatos(response, 'npr');
                            }
                            
                            if (servlet === 'ServletCurvas') {
                                frmCurva.cargarDatos(response, 'nc');
                            }
                            
                            if (servlet === 'ServletListaCheck') {
                                frmListaC.cargarDatos(response, 'nlc');
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
                    }
                });
            },
            
            verificarEstadoModificacion: function(idMaestro, servlet){
                
                $.ajax({
                    url: '../../../' + servlet,
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
                            if (servlet === 'ServletPreparaciones') {
                                frmPreparacion.cargarDatos(response, 'solic');
                            }
                            
                            if (servlet === 'ServletAuxiliares') {
                                frmAuxiliar.cargarDatos(response, 'solic');
                            }
                            
                            if (servlet === 'ServletProcesosPost') {
                                frmProcPos.cargarDatos(response, 'solic');
                            }
                            
                            if (servlet === 'ServletFibras') {
                                frmFibra.cargarDatos(response, 'solic');
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
                var self = this;
                
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
                        var text = '';
                        var class_name = '';
                        
                        if (response === 'true') {
                            
                            if (servlet === 'ServletCurvas') {
                                text = '¡Registro modificado exitosamente.!';
                                class_name = 'growl-info';
                                self.consultarMaestros('c');
                            
                            } else if (servlet === 'ServletProcesos') {
                                text = '¡Registro modificado exitosamente.!';
                                class_name = 'growl-info';
                                self.consultarMaestros('p');
                            
                            } else if (servlet === 'ServletListaCheck') {
                                text = '¡Registro modificado exitosamente.!';
                                class_name = 'growl-info';
                                self.consultarMaestros('lc');
                            
                            } else if (servlet !== 'ServletCurvas') {
                                text = '¡Solicitud enviada con éxito.!';
                                class_name = 'growl-info';                                
                            } 
                            
                            $(btnCerrar).click();
                            
                        } else {
                            
                            if (servlet === 'ServletCurvas') {
                                text = '¡Registro no modificado. Intente nuevamente.!';
                                class_name = 'growl-danger';
                            
                            } else if (servlet === 'ServletProcesos') {
                                text = '¡Registro no modificado. Intente nuevamente.!';
                                class_name = 'growl-danger';
                            
                            } else if (servlet === 'ServletListaCheck') {
                                text = '¡Registro no modificado. Intente nuevamente.!';
                                class_name = 'growl-danger';
                            
                            } else if (servlet !== 'ServletCurvas') {
                                text = '¡No se entregó la solicitud de modificación.!';
                                class_name = 'growl-danger';
                                
                            }
                        }
                        
                        $.gritter.add({
                            title: 'Modificar Registro',
                            text: text,
                            class_name: class_name,
                            sticky: false,
                            time: ""
                        });
                        
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
            }
        };
    })();

    consultas.init();

})(document, window, jQuery)