(function(document, window, $, undefined) {
    (function() {
        return consultas = {
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            UrlProdQuimicos: 'http://localhost:8084/ERPTenimosBackend/rest/productformulacion/',
            UrlPreparacion: 'http://localhost:8084/ERPTenimosBackend/rest/preparacion/',
            
            init: function() {
                this.consultarFibras();
                this.consultarQuimicosPrepAux();
                this.consultarQuimicosColorantes();
                this.consultarMaestros('');
            },
            
            consultarFibras: function() {
                
                $.ajax({
                    url: '../../../ServletFibras',
                    type: 'GET',
                    dataType: 'text',
                    data: {accion: 'buscar'},
                    success: function(response) {
                        //frmPreparacion.cargarDatos(response, 'f');
                        //frmAuxiliar.cargarDatos(response, 'f');
                        //frmProcPos.cargarDatos(response, 'f');
                        frmFibra.cargarDatos(response, 'f');
                        frmFormula.cargarDatos(response, 'f');
                    },
                    error: function(response, status, er) {
                        console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });
                
            },
            
            consultarQuimicosPrepAux: function() {
                
                $.get('../../../ServletProdFormulacion', {accion: 'quimicos'}, function(response) {
                    //frmPreparacion.cargarDatos(response, 'q');
                    //frmAuxiliar.cargarDatos(response, 'q');
                    //frmProcPos.cargarDatos(response, 'q');
                    frmFormula.cargarDatos(response, 'q');
                });
            },
            
            consultarQuimicosColorantes: function() {
                
                $.get('../../../ServletProdFormulacion', {accion: 'colorantes'}, function(response) {
                    frmFormula.cargarDatos(response, 'clrts');
                });
            },
            
            consultarMaestros: function(m) {
                
                if (m === '') {
                    $.get('../../../ServletPreparaciones', {accion: 'buscar'}, function(response) {
                        //frmPreparacion.cargarDatos(response, 'pr');
                        frmFormula.cargarDatos(response, 'pre');
                    });

                    $.get('../../../ServletAuxiliares', {accion: 'buscar'}, function(response) {
                        //frmAuxiliar.cargarDatos(response, 'au');
                        frmFormula.cargarDatos(response, 'aux');
                    });

                    $.get('../../../ServletProcesosPost', {accion: 'buscar'}, function(response) {
                        //frmProcPos.cargarDatos(response, 'pp');
                        frmFormula.cargarDatos(response, 'pp');
                    });
                    
                    $.get('../../../ServletFormulas', {accion: 'buscar', tipo:'compos'}, function(response) {
                        frmFormula.cargarDatos(response, 'cps');
                    });
                }
                
                if (m === '' || m === 'p') {
                    $.get('../../../ServletProcesos', {accion: 'buscar'}, function(response) {
                        frmProceso.cargarDatos(response, 'pr');
                        frmFormula.cargarDatos(response, 'pr');
                    });
                }
                
                if (m === '' || m === 'c') {
                    $.get('../../../ServletCurvas', {accion: 'buscar'}, function(response) {
                        frmProceso.cargarDatos(response, 'c');
                        frmCurva.cargarDatos(response, 'c');
                        frmFormula.cargarDatos(response, 'curv');
                    });
                }
                
                if (m === '' || m === 'll') {
                    $.get('../../../ServletLabelList', {accion: 'buscar'}, function(response) {
                        frmListaC.cargarDatos(response, 'll');
                        frmCurva.cargarDatos(response, 'll');
                    });
                }
                
                if (m === '' || m === 'lc') {
                    $.get('../../../ServletListaCheck', {accion: 'buscar'}, function(response) {
                            frmListaC.cargarDatos(response, 'lc');
                            frmCurva.cargarDatos(response, 'lc');
                    });
                }
                
                if (m === '' || m === 'clr') { //Colores
                    $.get('../../../ServletFormulas', {accion: 'buscar', tipo: 'color'}, function(response) {
                            frmFormula.cargarDatos(response, 'clr');
                    });
                }
                
                if (m === '' || m === 'tn') { //Tonos
                    $.get('../../../ServletFormulas', {accion: 'buscar', tipo: 'tono'}, function(response) {
                            frmFormula.cargarDatos(response, 'tn');
                    });
                }
            },
            
            formularioPreparacion: function() {
                var self = this;
                
                $.get(self.UrlFibras + 'listadoFibras', function (data){
                    frmPreparacion.cargarDatos(data, 'f');
                });

                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    frmPreparacion.cargarDatos(data, 'q');
                });

                $.get(self.UrlPreparacion + 'maestros', function(data) {
                    frmPreparacion.cargarDatos(data, 'pr');
                });
            },
            
            consultarNombreMaestros: function(nombre, tipo, idMaestro, form) {
                var self = this;
                var url;
                
                if (form === 'preparacion') {
                    url = self.UrlPreparacion;
                } else if (form === 'auxiliar') {
                    url = '';
                } else if (form === 'proPost') {
                    url = '';
                } 
                
                    $.ajax({
                        url: url + 'buscarNombre',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            tipo: tipo,
                            idMaestro: idMaestro,
                            nombre: nombre
                        },
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function(res) {
                            if (tipo === 'nuevo') {
                                frmPreparacion.agregarPreparacion(res);
                                
                            } else if (tipo === 'editar') {
                                frmPreparacion.solicitarModificarPreparacion(res);
                            }
                        },
                        error: function(res, status, er) {
                            $.gritter.add({
                                title: "Problema con la Aplicación",
                                text: "error: " + res + " status: " + status + " er:" + er,
                                class_name: "growl-danger",
                                sticky: false,
                                time: ""
                            });
                        }
                    });
                
                /*
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
                            
                            if (servlet === 'ServletLabelList') {
                                frmListaC.agregarRegistro(response, 'll');
                            }
                            
                            if (servlet === 'ServletListaCheck') {
                                frmListaC.agregarRegistro(response, 'lc');
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
                            
                            if (servlet === 'ServletLabelList') {
                                frmListaC.solicitarModificarRegistro(response, 'll');
                            }
                            
                            if (servlet === 'ServletListaCheck') {
                                frmListaC.solicitarModificarRegistro(response, 'lc');
                            }
                        }
                    },
                    error: function(response, status, er) {
                        console.log("error: " + response + " status: " + status + " er:" + er);
                    }
                });*/
            },
            
            guardarParaAprobar: function(datos, form) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                var url;
                
                if (form === 'preparacion') {
                    url = self.UrlPreparacion;
                } else if (form === '') {
                    
                } else if (form === '') {
                    
                }
                
                $.ajax({
                    url: url + 'guardarParaAprobacion',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        datos: JSON.stringify(datos),
                        idUsuario: usuario.numUsuario
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    success: function(res) {
                        if (res) {

                            $.gritter.add({
                                title: "Aprobación de Maestro",
                                text: "¡Se ha enviado la solicitud satisfactoriamente!",
                                sticky: false,
                                time: ""
                            });

                            $.get(url + 'maestros', function(data) {
                                if (form === 'preparacion') {
                                    frmPreparacion.cargarDatos(data, 'npr');
                                } else if (form === '') {
                                    
                                } else if (form === '') {
                                    
                                }
                            });

                        } else if (!res) {
                            $.gritter.add({
                                title: "Aprobación de Maestro",
                                text: "¡No se entrego la solicitud!",
                                class_name: "growl-danger",
                                sticky: false,
                                time: ""
                            });
                        }
                    },
                    error: function(res, status, er) {
                        $.gritter.add({
                            title: "Problema con la Aplicación",
                            text: "error: " + res + " status: " + status + " er:" + er,
                            class_name: "growl-danger",
                            sticky: false,
                            time: ""
                        });
                    }
                });
            },
            
            guardarNuevoMaestro: function(datos, form, btnCerrar, fila) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);                
                datos.idUsuario = usuario.numUsuario;
                
                if (form === 'preparacion') {
                    $.ajax({
                        url: self.UrlPreparacion + 'guardar',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            datos: JSON.stringify(datos)
                        },
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function(res) {
                            if (res) {
                                
                                $.gritter.add({
                                    title: "Registro Guardado",
                                    text: "¡Se ha guardado satisfactoriamente!",
                                    class_name: "growl-success",
                                    sticky: false,
                                    time: ""
                                });
                                
                                $(btnCerrar).click();
                                $(fila).remove();
                                
                                $.get(self.UrlPreparacion + 'maestros', function(data) {
                                    frmPreparacion.cargarDatos(data, 'npr');
                                });

                            } else if (!res) {
                                $.gritter.add({
                                    title: "Registro No Guardado",
                                    text: "¡No se ha guardado el registro!",
                                    class_name: "growl-danger",
                                    sticky: false,
                                    time: ""
                                });
                            }
                        },
                        error: function(res, status, er) {
                            $.gritter.add({
                                title: "Problema con la Aplicación",
                                text: "error: " + res + " status: " + status + " er:" + er,
                                class_name: "growl-danger",
                                sticky: false,
                                time: ""
                            });
                        }
                    });
                }
            },
            
            verificarEstadoModificacion: function(idMaestro, servlet){
                var self = this;
                
                /*$.ajax({
                    url: self.UrlPreparacion + 'verificarModificacion',
                    type: "GET",
                    dataType: 'json',
                    data: {
                        idMaestro: idMaestro
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    success: function(res){
                        frmPreparacion.cargarDatos(res, 'solic');
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
                });*/
            },
            
            //solicitarModificarMaestro: function(datos, btnCerrar, servlet) {
            solicitarModificarMaestro: function(datos, btnCerrar, form) {
                var self = this;
                
                if (form === 'preparacion') {
                    $.ajax({
                        url: self.UrlPreparacion + 'editar',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            datos: JSON.stringify(datos)
                        },
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function(res) {
                            if (res) {
                                $.gritter.add({
                                    title: 'Modificar Registro',
                                    text: '¡Solicitud enviada con éxito.!',
                                    sticky: false,
                                    time: ""
                                });

                                $(btnCerrar).click();

                            } else {

                                $.gritter.add({
                                    title: 'Modificar Registro',
                                    text: '¡No se entregó la solicitud de modificación.!',
                                    class_name: 'growl-danger',
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
                        }
                    });
                }
                
                /*$.ajax({
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
                            
                            } else if (servlet === 'ServletLabelList') {
                                text = '¡Registro modificado exitosamente.!';
                                class_name = 'growl-info';
                                self.consultarMaestros('ll');
                            
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
                            
                            } else if (servlet === 'ServletLabelList') {
                                text = '¡Registro no modificado. Intente nuevamente.!';
                                class_name = 'growl-danger';
                            
                            } else if (servlet !== 'ServletCurvas') {
                                text = '¡No se entregó la solicitud de modificación.!';
                                class_name = 'growl-danger';
                                
                            } else if (servlet === 'ServletListaCheck') {
                                text = '¡Registro no modificado. Intente nuevamente.!';
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
                });*/
            },
            
            consultarMaestroFormulas: function(fibra, compos, color, tono, tipoFecha, fechaDes, fechaHas, rango, valor1, valor2, activa) {
                
                $.get('../../../ServletFormulas', {
                    accion: 'buscar',
                    tipo:'formula',
                    fibra: fibra,
                    compos: compos,
                    color: color,
                    tono: tono,
                    tipoFecha: tipoFecha,
                    fechaDes: fechaDes,
                    fechaHas: fechaHas,
                    rango: rango,
                    valor1: valor1,
                    valor2: valor2,
                    activa: activa
                    }, 
                    function(response) {
                        frmFormula.cargarDatos(response, 'fla');
                });                
            },
            
            consultarNombreFormula: function(nom) {
                $.get('../../../ServletFormulas', {
                    accion: 'buscarNombre',
                    idFibra: nom.idFibra,
                    idColor: nom.idColor,
                    codTono: nom.codTono,
                    compos: nom.compos
                    },
                    function(response) {
                        var data = JSON.parse(response);
                        
                        if (data === 'true') {
                            $.gritter.add({
                                title: 'Nombre Formula',
                                text: 'Ya existe una formula con las características seleccionadas.',
                                class_name: 'growl-info',
                                sticky: false,
                                time: ""
                            });
                        } else {
                            //frmFormula.cargarDatos(response, 'fla');
                        }
                            
                });
            }, 
            
            guardarFormula: function(obj) {
                
                $.get('../../../ServletFormulas', {
                    accion: 'guardar',
                    nomFormula: obj.nomFormula,
                    idFibra: obj.idFibra,
                    compos: obj.compos,
                    idColor: obj.idColor,
                    desColor: obj.desColor,
                    codTono: obj.codTono,
                    codPantone: obj.codPantone,
                    phFormula: obj.phFormula,
                    color: obj.color,
                    idProceso: obj.idProceso,
                    idPreparacion: obj.idPreparacion,
                    idAuxiliar: obj.idAuxiliar,
                    idProPost: obj.idProPost,
                    codColorante: obj.codColorante,
                    cantColorante: obj.cantColorante,
                    codAuxEsp: obj.codAuxEsp,
                    cantCodAuxEsp: obj.cantCodAuxEsp,
                    observ: obj.observ,
                    idFormula: obj.idFormula,
                    consec: obj.consec
                }, function(response) {
                    var data = JSON.parse(response);

                    if (data) {
                        $.gritter.add({
                            title: "Registro Guardado",
                            text: "¡Se ha guardado satisfactoriamente!",
                            class_name: "growl-success",
                            sticky: false,
                            time: ""
                        });

                        /*
                         if (servlet === 'ServletListaCheck') {
                         frmListaC.cargarDatos(response, 'nlc');
                         frmCurva.cargarDatos(response, 'lc');
                         }
                         */
                    } else {
                        $.gritter.add({
                            title: "Registro No Guardado",
                            text: "¡No se ha guardado el registro!",
                            class_name: "growl-danger",
                            sticky: false,
                            time: ""
                        });
                    }
                });                
            },
            
            editarFormula: function(obj) {
                
                $.get('../../../ServletFormulas', {
                    accion: 'editar',
                    nomFormula: obj.nomFormula,
                    idFibra: obj.idFibra,
                    compos: obj.compos,
                    idColor: obj.idColor,
                    desColor: obj.desColor,
                    codTono: obj.codTono,
                    codPantone: obj.codPantone,
                    phFormula: obj.phFormula,
                    color: obj.color,
                    idProceso: obj.idProceso,
                    idPreparacion: obj.idPreparacion,
                    idAuxiliar: obj.idAuxiliar,
                    idProPost: obj.idProPost,
                    codColorante: obj.codColorante,
                    cantColorante: obj.cantColorante,
                    codAuxEsp: obj.codAuxEsp,
                    cantCodAuxEsp: obj.cantCodAuxEsp,
                    observ: obj.observ,
                    idFormula: obj.idFormula,
                    consec: obj.consec
                }, function(response) {
                    var data = JSON.parse(response);

                    if (data) {
                        $.gritter.add({
                            title: "Registro Editado",
                            text: "¡Se ha editado satisfactoriamente!",
                            class_name: "growl-success",
                            sticky: false,
                            time: ""
                        });

                    } else {
                        $.gritter.add({
                            title: "Registro No Editado",
                            text: "¡No se ha editado el registro!",
                            class_name: "growl-danger",
                            sticky: false,
                            time: ""
                        });
                    }
                });                
            },
            
            consultarPendientes: function() {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                
                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    pa.cargarDatos(data, 'q');
                });
                
                $.ajax({
                    url: self.UrlPreparacion + 'pendientesPorAprobar',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        idUser: usuario.numUsuario
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    success: function(res) {
                        if (!$.isEmptyObject(res)) {                            
                            pa.cargarDatos(res, 'preparacion', 'nuevo');
                        } else {
                            $.gritter.add({
                                title: 'Maestros Pendientes',
                                text: 'No hay preparaciones pendientes para aprobar.',
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
                    }
                });
            },
            
            consultarPendientesParaEditar: function() {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                
                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    pa.cargarDatos(data, 'q');
                });
                
                $.get(self.UrlFibras + 'listadoFibras', function (data){
                    pa.cargarDatos(data, 'f');
                });
                
                $.ajax({
                    url: self.UrlPreparacion + 'pendientesPorAprobarYeditar',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        idUser: usuario.numUsuario
                    },
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    success: function(res) {
                        if (!$.isEmptyObject(res)) {                            
                            pa.cargarDatos(res, 'preparacion', 'editar');
                        } else {
                            $.gritter.add({
                                title: 'Maestros Pendientes',
                                text: 'No hay preparaciones pendientes para aprobar.',
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
                    }
                });
            }
        };
    })();

    consultas.init();

})(document, window, jQuery)