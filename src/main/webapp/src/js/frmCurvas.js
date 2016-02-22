(function(document, window, $, undefined) {
    (function() {
        return frmCurva = {
            oCurvas: '',
            $dataTableCurva: $('#dataTableCurva'),
            $nomCurva: $('#nombCurva'),
            $tiempoCurva: $('#tiempCurva'),
            $llenadoCurva: $('#llenadCurva'),
            $rinseCurva: $('#rinsCurva'),
            $btnSaveCurva: $('#btnSaveCurva'),
            $btnCleanCurva: $('#btnCleanCurva'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditCurva: $('#modalEditCurva'),
            $eNombCurva: $('#eNombCurva'),
            $eTiempCurva: $('#eTiempCurva'),
            $eLlenadCurva: $('#eLlenadCurva'),
            $eRinseCurva: $('#eRinsCurva'),
            $eTextArea: $('#modalEditCurva').find('textarea'),
            $eBtnModificar: $('#eBtnModificarCurva'),
            $eBtnCerrar: $('#eBtnCerrarModalEdit'),
            $eBtnCerrar2: $('#modalEditCurva').find('.modal-header .close'),
            idCurva: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.consultaNombreCurva();
                this.verCurva();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                
                if (opc === 'c') {
                    self.oCurvas = '';
                    self.oCurvas = data;
                    um.destruirDataTable(self.$dataTableCurva.dataTable(), '6');
                    um.renderDataTables(self.$dataTableCurva, self.oCurvas, 'c');
                }

                if (opc === 'nc') {
                    if (data !== null) {
                        self.oCurvas = "";
                        self.oCurvas = data;
                        um.destruirDataTable(self.$dataTableCurva.dataTable(), '6');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableCurva, self.oCurvas, 'c');
                        self.pintarCamposObligatorios();
                    }
                }
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomCurva.on('keyup keypress', function() {
                    self.$nomCurva.val(self.$nomCurva.val().toUpperCase());
                });

                self.$eNombCurva.on('keyup keypress', function() {
                    self.$eNombCurva.val(self.$eNombCurva.val().toUpperCase());
                })
                
                self.$tiempoCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eTiempCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$llenadoCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eLlenadCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$rinseCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eRinseCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$btnCleanCurva.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];
                u.limpiarCampos(elementos);

                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];
              
              u.camposObligatorios(campos, '1');
            },
            
            mensajeObligatoriedad: function(mensaje) {
                var self = this;

                try {
                    self.$tituloMensaje.text(mensaje.titulo);
                    self.$cuerpoMensaje.text(mensaje.cuerpoMensaje);
                    self.$modalMensaje.modal("show");
                } catch (e) {
                    alert(mensaje.cuerpoMensaje);
                }
            },
            
            consultaNombreCurva: function(){
                var self = this;

                self.$btnSaveCurva.on("click", function(e) {
                    e.preventDefault();
                    
                    var campObligPrep = false;
                    var elementos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];

                    campObligPrep = u.camposObligatorios(elementos, '2');

                    if (campObligPrep) {                        
                        consultas.consultarNombreMaestros(self.$nomCurva.val(), 'nuevo', 0, 'ServletCurvas');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    var nombre = '';
                    var campOblig = false;
                    var elementos = [self.$eNombCurva, self.$eTiempCurva, self.$eLlenadCurva, self.$eRinseCurva, self.$eTextArea];

                    campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oCurvas.length; i++) {
                            if (self.oCurvas[i].idCurva === parseInt(self.idCurva)) {
                                if (self.oCurvas[i].nomCurva !== self.$eNombCurva.val()) {
                                    nombre = self.$eNombCurva.val();
                                }
                                break;
                            }
                        }
                        
                        consultas.consultarNombreMaestros(nombre, 'editar', self.idCurva, 'ServletCurvas');                        
                    }
                });
            },
            
            agregarCurva: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Curva Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomCurva.val();
                    var tiempo = self.$tiempoCurva.val();
                    var llenado = self.$llenadoCurva.val();
                    var rinse = self.$rinseCurva.val();
                    
                    um.guardarRegistro({form: 'curva', nombre: nombre, tiempo: tiempo, llenado: llenado, rinse: rinse}, 'ServletCurvas');
                }
            },
            
            verCurva: function() {
                var self = this;

                self.$dataTableCurva.on('click', '#btnView', function (e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNombCurva, self.$eTiempCurva, self.$eLlenadCurva, self.$eRinseCurva, self.$eTextArea];
                    
                    self.banderaModal = 1;
                    self.idCurva = parseInt(fila[0].cells[0].textContent);
                    
                    u.limpiarCampos(elementos);
                    
                    for (var i = 0; i < self.oCurvas.length; i++) {
                        if (self.oCurvas[i].idCurva === self.idCurva) {
                            self.$eNombCurva.val(self.oCurvas[i].nomCurva);
                            self.$eTiempCurva.val(self.oCurvas[i].tiempoCurva);
                            self.$eLlenadCurva.val(self.oCurvas[i].llenadoCurva);
                            self.$eRinseCurva.val(self.oCurvas[i].rinseCurva);
                            break;
                        }
                    }
                    
                    self.$modalEditCurva.modal('show', 'slow');
                    
                    u.camposObligatorios(elementos, '3');
                    
                    e.stopPropagation();
                });
            },
            
            solicitarModificarCurva: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Curva Existente.',
                        cuerpoMensaje: 'Ya existe una curva con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var tiempo = '';
                    var llenado = '';
                    var rinse = '';
                    var j = 0;
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; i < self.oCurvas.length; i++) {
                        if (self.oCurvas[i].idCurva === parseInt(self.idCurva)) {
                            j = i;
                            if (self.oCurvas[i].nomCurva !== self.$eNombCurva.val()) {
                                nombre = self.$eNombCurva.val();
                            } else {
                                nombre = self.oCurvas[i].nomCurva;
                            }
                            
                            if (self.oCurvas[i].tiempoCurva !== parseInt(self.$eTiempCurva.val())) {
                                tiempo = self.$eTiempCurva.val();
                            } else {
                                tiempo = self.oCurvas[i].tiempoCurva;
                            }
                            
                            if (self.oCurvas[i].llenadoCurva !== parseInt(self.$eLlenadCurva.val())) {
                                llenado = self.$eLlenadCurva.val();
                            } else {
                                llenado = self.oCurvas[i].llenadoCurva;
                            }
                            
                            if (self.oCurvas[i].rinseCurva !== parseInt(self.$eRinseCurva.val())) {
                                rinse = self.$eRinseCurva.val();
                            } else {
                                rinse = self.oCurvas[i].rinseCurva;
                            }
                            
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: '', nombre: nombre, tiempo: tiempo, llenado: llenado, rinse: rinse, idMaestro: self.idCurva, coment: coment, org: self.oCurvas[j]}, [], [], self.$eBtnCerrar, 'ServletCurvas');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditCurva.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$modalEditCurva.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditCurva.is(':visible') && e.keyCode === 27) {
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
            }
        };
    })();

    frmCurva.init();

})(document, window, jQuery)