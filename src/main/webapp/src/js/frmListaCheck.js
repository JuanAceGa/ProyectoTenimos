(function(document, window, $, undefined) {
    (function() {
        return frmListaC = {
            oItems: '',
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $nomItem: $('#nomItem'),
            $btnSaveItem: $('#btnSaveItem'),
            $btnCleanItem: $('#btnCleanItem'),
            $dataTableLista: $('#dataTableLista'),
            $modalEditLabel: $('#modalEditLabel'),
            $eNomLabel: $('#eNomLabel'),
            $eTextarea: $('#modalEditLista').find('textarea'),
            $eBtnModificarLabel: $('#eBtnModificarLabel'),
            $eBtnCerrarLabel: $('#eBtnCerrarModalElista'),
            $eBtnCerrarLabel2: $('#modalEditLista').find('.modal-header .close'),
            idItem: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.consultaNombre();
                this.verItem();
                this.cerrarModalEdicion();
            },
            
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);

                if (opc === 'lc') {
                    self.oItems = '';
                    self.oItems = data;
                    um.destruirDataTable(self.$dataTableLista, '');
                    um.renderDataTables(self.$dataTableLista, self.oItems, 'lc');
                }

                if (opc === 'nlc') {
                    if (data !== null) {
                        self.oItems = "";
                        self.oItems = data;
                        um.destruirDataTable(self.$dataTableLista, '');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableLista, self.oItems, 'lc');
                        self.pintarCamposObligatorios();
                    }
                }
            },
            
            metodosUtiles: function() {
                var self = this;
                
                self.$nomItem.on('keyup keypress', function() {
                    self.$nomItem.val(self.$nomItem.val().toUpperCase());
                });
                
                self.$eNomLabel.on('keyup keypress', function() {
                    self.$eNomLabel.val(self.$eNomLabel.val().toUpperCase());
                });
                
                self.$btnCleanItem.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
            },
            
            limpiarFormulario: function() {
                var self = this;

                var elementos = [self.$nomItem];
                u.limpiarCampos(elementos);

                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
                var self = this;
                var campos = [self.$nomItem];

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
            
            consultaNombre: function() {
                var self = this;

                self.$btnSaveItem.on("click", function(e) {
                    e.preventDefault();

                    var campObligPrep = false;
                    var elementos = [self.$nomItem];

                    campObligPrep = u.camposObligatorios(elementos, '2');

                    if (campObligPrep) {
                        consultas.consultarNombreMaestros(self.$nomItem.val().trim(), 'nuevo', 0, 'ServletListaCheck');
                    }
                });

                self.$eBtnModificarLabel.on("click", function(e) {
                    e.preventDefault();

                    var nombre = '';
                    var campOblig = false;
                    var elementos = [self.$eNomLabel];

                    campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                                if (self.oItems[i].nombreLabel !== self.$eNomLabel.val()) {
                                    nombre = self.$eNomLabel.val().trim();
                                }
                                break;
                            }
                        }

                        consultas.consultarNombreMaestros(nombre, 'editar', self.idItem, 'ServletListaCheck');
                    }
                });
            },
                
            agregarRegistro: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Item para Lista de Chequeo Existente.',
                        cuerpoMensaje: 'Ya hay un item con ese nombre, por favor intente nuevamente.'
                    });

                } else if (response === 'false') {
                    var nombre = self.$nomItem.val().trim();
                    
                    um.guardarRegistro({form: 'listaCheck', nombre: nombre}, 'ServletListaCheck');
                }
            },
            
            verItem: function() {
                var self = this;

                self.$dataTableLista.on('click', '#btnView', function(e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomLabel, self.$eTextarea];

                    self.banderaModal = 1;
                    self.idItem = parseInt(fila[0].cells[0].textContent);

                    u.limpiarCampos(elementos);

                    for (var i = 0; i < self.oItems.length; i++) {
                        if (self.oItems[i].idLabel === self.idItem) {
                            self.$eNomLabel.val(self.oItems[i].nombreLabel);
                            break;
                        }
                    }

                    self.$modalEditLabel.modal('show', 'slow');

                    u.camposObligatorios(elementos, '3');

                    e.stopPropagation();
                });
            },
            
            solicitarModificarRegistro: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Item para Lista de Chequeo Existente.',
                        cuerpoMensaje: 'Ya hay un item con ese nombre, por favor intente nuevamente.'
                    });

                } else if (response === 'false') {
                    var nombre = '';
                    var j = 0;

                    var coment = self.$eTextarea.val();

                    for (var i = 0; i < self.oItems.length; i++) {
                        if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                            j = i;
                            if (self.oItems[i].nombreLabel !== self.$eNomLabel.val()) {
                                nombre = self.$eNomLabel.val().trim();
                            } else {
                                nombre = self.oItems[i].nombreLabel;
                            }
                            break;
                        }
                    }

                    um.SolicitarModificarRegistro({tabla: '', nombre: nombre, idMaestro: self.idItem, coment: coment, org: self.oItems[j]}, [], [], self.$eBtnCerrarLabel, 'ServletListaCheck');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;

                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditLabel.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextarea.val('');
                    }
                });

                self.$modalEditLabel.on('keydown', function(e) {
                    if (self.banderaModal === 1 && self.$modalEditLabel.is(':visible') && e.keyCode === 27) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextarea.val('');
                    }
                });

                self.$eBtnCerrarLabel.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextarea.val('');
                });

                self.$eBtnCerrarLabel2.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextarea.val('');
                });
            }
        }
    })();
    frmListaC.init();
})(document, window, jQuery)