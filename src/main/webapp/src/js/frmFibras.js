(function(document, window, $, undefined) {
    (function() {
        return frmFibra = {
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            oFibras: {},
            $frmFibra: $('#frmFibra'),
            $dataTableFibra: $('#dataTableFibra'),
            $nomFibra: $('#nomFibra'),
            $codFibra: $('#codFibra'),
            $cbxComposicion: $('#cbxComposicion'),
            $btnSaveFibra: $('#btnSaveFibra'),
            $btnCleanFibra: $('#btnCleanFibra'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditFibra: $('#modalEditFibra'),
            $eNomFibra: $('#eNomFibra'),
            $eCodFibra: $('#eCodFibra'),
            $eCbxComposicion: $('#eCbxComposicion'),
            $eTextArea: $('#modalEditFibra').find('textarea'),
            $eBtnModificar: $('#eBtnEditFibra'),
            $eBtnRestFibra: $('#eBtnRestFibra'),
            $eBtnCerrar: $('#eBtnCerrarModalEditFib'),
            $eBtnCerrar2: $('#modalEditFibra').find('.modal-header .close'),
            idFibra: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            solicitudesEnviadas: [],
            solcNombre: false,
            solcFibra: false,
            solcCompos: false,
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.consultaNombreFibra();
                this.verFibra();
                this.cerrarModalEdicion();
            },
            
            consultasFibras: function() {
                var self = this;
                
                $.get(self.UrlFibras + 'listadoFibras', function(data) {
                    self.cargarDatos(data, 'f');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'fibras/listadoFibras');
                });
            },
            
            cargarDatos: function(data, opc) {
                var self = this;
                
                if (opc === 'f') {
                    self.oFibras = data;
                    
                    um.destruirDataTable(self.$dataTableFibra.dataTable(), '4');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTableFibra, self.oFibras, 'f');
                    self.pintarCamposObligatorios();
                }
            },
            
            metodosUtiles: function() {
                var self = this;
                
                self.$nomFibra.focusin(function() {
                    self.$nomFibra.css('text-transform', 'uppercase');
                });
                
                self.$nomFibra.focusout(function() {
                    u.camposObligatorios([self.$nomFibra], '4');
                    
                    (self.$nomFibra.val() === '') ? self.$nomFibra.css('text-transform', '') : '';
                });
                
                self.$eNomFibra.focusin(function() {
                    self.$eNomFibra.css('text-transform', 'uppercase');
                });
                
                self.$eNomFibra.focusout(function() {
                    u.camposObligatorios([self.$eNomFibra], '4');
                    
                    (self.$eNomFibra.val() === '') ? self.$eNomFibra.css('text-transform', '') : '';
                });
                
                self.$codFibra.focusout(function () {
                    u.camposObligatorios([self.$codFibra], '4');
                });
                
                self.$eCodFibra.focusout(function () {
                    u.camposObligatorios([self.$eCodFibra], '4');
                });
                
                self.$codFibra.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodFibra.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanFibra.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestFibra.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodFibra, self.$eNomFibra];
                   u.limpiarCampos(elementos);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$codFibra, self.$nomFibra];
                u.limpiarCampos(elementos);
                self.$cbxComposicion.val('Seleccione una...');
                
                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var elementos = [self.$nomFibra , self.$codFibra, self.$cbxComposicion];
              
              u.camposObligatorios(elementos, '1');
            },
            
            mensajeModalAndGritter: function(m) {
                var self = this;
                
                if (m.tipo === 'modal') {
                
                    try {
                        self.$tituloMensaje.text(m.titulo);
                        self.$cuerpoMensaje.text(m.mensaje);
                        self.$modalMensaje.modal("show");
                    } catch (e) {
                        alert(m.mensaje);
                    }
                    
                } else if (m.tipo === 'gritter') {
                
                    if (m.clase === '') {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            sticky: false,
                            time: ''
                        });
                    } else {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            class_name: m.clase,
                            sticky: false,
                            time: ''
                        });
                    }
                }                
            },
            
            consultaNombreFibra: function(){
                var self = this;

                self.$btnSaveFibra.on("click", function(e) {
                    e.preventDefault();
                    var elementos = [self.$codFibra, self.$nomFibra, self.$cbxComposicion];
                    var campOblig = u.camposObligatorios(elementos, '2');
                    var n = self.$nomFibra.val().trim();
                    var nombre = n.toUpperCase();
                    
                    if (campOblig) {
                        self.consultarNombresFibras('nuevo', 0, nombre);
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    var elementos = [self.$eCodFibra, self.$eNomFibra, self.$eCbxComposicion, self.$eTextArea];
                    var campOblig = u.camposObligatorios(elementos, '2');
                    
                    var codFib = self.$eCodFibra.val().trim();
                    var n = self.$eNomFibra.val().trim();
                    var nombre = n.toUpperCase();
                    var compos = self.$eCbxComposicion.val();
                    
                    if (campOblig) {
                        for (var i = 0; i < self.oFibras.length; i++){
                            if (self.oFibras[i].idFibra === self.idFibra) {
                                
                                self.consultarNombresFibras('editar', self.idFibra,(self.oFibras[i].codFibra !== codFib || self.oFibras[i].nomFibra !== nombre) ? codFib + ';' + nombre : '')
                                break;
                            }
                        }
                    }
                });
            },
            
            consultarNombresFibras: function(t, i, n) {
                var self = this;

                $.get(self.UrlFibras + 'buscarNombre', {
                    tipo: t,
                    idMaestro: i,
                    nombre: n
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarFibra(res);
                    } else {
                        self.solicitarModificarFibra(res);
                    }

                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'fibras/buscarNombre');
                });
            },
            
            agregarFibra: function(res) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                var datos = new Object();
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Fibra Existente.',
                        mensaje: 'Ya hay una fibra con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    
                    var n = self.$nomFibra.val().trim();
                    
                    //um.guardarRegistro({form: '', tabla: '', nombre: self.$nomFibra.val(), idFib: self.$codFibra.val(), compos: self.$cbxComposicion.val()}, 'ServletFibras');
                    
                    datos.nombMaestro = null;
                    datos.fechaUso = null;
                    datos.idFibra = null;
                    datos.codFibra = self.$codFibra.val().trim();
                    datos.nomFibra = n.toUpperCase();
                    datos.composFibra = self.$cbxComposicion.val();
                    datos.costo = null;
                    datos.quimicos = null;
                    datos.idUsuario = usuario.numUsuario;
                    
                    $.get(self.UrlFibras + 'guardar', {
                        datos: JSON.stringify(datos)
                    }, function(res) {
                        if (res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'fibras/guardar',
                                mensaje: '¡Se guardó la fibra.!',
                                clase: 'growl-success'
                            });
                            
                            self.limpiarFormulario();
                            self.consultasFibras();

                        } else if (!res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'fibras/guardar',
                                mensaje: '¡No se guardó la fibra.!',
                                clase: "growl-danger"
                            });
                        }
                    }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'fibras/guardar');
                });
                }
            },
            verFibra: function() {
                var self = this;

                self.$dataTableFibra.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idFibra = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eCodFibra, self.$eNomFibra, self.$eCbxComposicion];
                    //consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'ServletFibras');
                    var datos = {
                        frm: 'f',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oFibras,
                        quimicos: '',
                        eNombre: self.$eCodFibra,
                        eNombreFib: self.$eNomFibra,
                        eCompos: self.$eCbxComposicion,
                        eTabla: '',
                        eModal: self.$modalEditFibra
                    }
                    
                    u.limpiarCampos(elementos);
                    u.camposObligatorios(elementos, '3');
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    um.verRegistro(datos);
                    
                    e.stopPropagation();
                });
                    
            },
            
            verificarSolicitudes: function() {
                var self = this;
                var elementos = [self.$eNomFibra, self.$eCodFibra, self.$eCbxComposicion];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra, solcCompos: self.solcCompos});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            solicitarModificarFibra: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Fibra Existente.',
                        mensaje: 'Ya hay una fibra con este nombre, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var dModFibra = new Object();
                    var nomFibra = '';
                    var nomFibraNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    var compos = '';
                    var composNue = '';

                    var coment = self.$eTextArea.val();

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].idFibra === self.idFibra) {

                            if (self.oFibras[i].nomFibra !== self.$eNomFibra.val()) {
                                nomFibra = self.oFibras[i].nomFibra;
                                var n = self.$eNomFibra.val().trim();
                                nomFibraNue = n.toUpperCase();
                            }

                            if (self.oFibras[i].codFibra !== self.$eCodFibra.val()) {
                                idFib = self.oFibras[i].codFibra;
                                idFibNue = self.$eCodFibra.val()
                            }

                            if (self.oFibras[i].composicion !== self.$eCbxComposicion.val()) {
                                compos = self.oFibras[i].composicion;
                                composNue = self.$eCbxComposicion.val();
                            }
                            break;
                        }
                    }

                    dModFibra.idReg = self.idFibra;
                    dModFibra.nombreReg = null;
                    dModFibra.nombreRegNue = null;
                    dModFibra.idFibra = idFib;
                    dModFibra.idFibraNue = idFibNue;
                    dModFibra.nomFibra = nomFibra;
                    dModFibra.nomFibraNue = nomFibraNue;
                    dModFibra.idSolicitante = usuario.idUsuario.idPersonal;
                    dModFibra.comentario = coment;
                    dModFibra.quimicoMod = null;
                    dModFibra.quimicoNue = null;
                    dModFibra.compos = compos;
                    dModFibra.composNue = composNue;
                    
                    if (dModFibra.idFibraNue !== '' || dModFibra.nomFibraNue !== '' || dModFibra.composNue !== '') {

                        $.get(self.UrlFibras + 'editar', {
                            datos: JSON.stringify(dModFibra)
                        }, function(res) {

                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'fibras/editar',
                                    mensaje: '¡Se modificó la fibra.!',
                                    clase: ''
                                });

                                self.$eBtnCerrar.click();
                                
                                self.consultasFibras();

                            } else {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'fibras/editar',
                                    mensaje: '¡No se modificó la fibra.!',
                                    clase: 'growl-warning'
                                });
                            }
                        }).fail(function(res, status, er){
                            self.errorDeConexion(res, status, er, 'fibras/editar');
                        });

                    } else {
                        self.mensajeModalAndGritter({
                            tipo: 'gritter',
                            titulo: "fibras/editar",
                            mensaje: "¡No hay datos a modificar.!",
                            clase: "growl-warning",
                        });
                    }
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditFibra.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$modalEditFibra.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditFibra.is(':visible') && e.keyCode === 27) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                });
            },
            
            errorDeConexion: function(res, status, er, serv) {
                var self = this;
                self.mensajeModalAndGritter({
                    tipo: 'gritter',
                    titulo: 'Servicio: ' + serv,
                    mensaje: 'status: ' + status + ' er: ' + er,
                    clase: 'growl-danger'
                });
            }
        };
    })();

    frmFibra.init();

})(document, window, jQuery)