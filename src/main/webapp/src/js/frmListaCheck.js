(function(document, window, $, undefined) {
    (function() {
        return frmListaC = {
            oItems: '',
            oListas: '',
            idItem: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $nomItem: $('#nomItem'),
            $btnSaveItem: $('#btnSaveItem'),
            $btnCleanItem: $('#btnCleanItem'),
            $nomListCheck: $('#nomListCheck'),
            $tableNewLabel: $('#tableNewLabel'),
            $nomLabel: $('#nomLabel'),
            $dlNomEtiqueta: $('#dlNomEtiqueta'),
            $btnAddLineaLabel: $('#btnAddLineaLabel'),
            $btnSaveLista: $('#btnSaveLista'),
            $btnCleanLista: $('#btnCleanLista'),            
            $dataTableLabel: $('#dataTableLabel'),
            $dataTableLista: $('#dataTableLista'),
            $modalEditLabel: $('#modalEditLabel'),
            $eNomLabel: $('#eNomLabel'),
            $eTextAreaLabel: $('#modalEditLabel').find('textarea'),
            $eBtnModificarLabel: $('#eBtnModificarLabel'),
            $eBtnCerrarLabel: $('#eBtnCerrarModalElabel'),
            $eBtnCerrarLabel2: $('#modalEditLabel').find('.modal-header .close'),
            $modalEditLista: $('#modalEditLista'),
            $eNomLista: $('#eNomLista'),
            $eTextAreaLista: $('#modalEditLista').find('textarea'),
            $eBtnModificarLista: $('#eBtnModificarLista'),
            $eBtnCerrarLista: $('#eBtnCerrarModalElista'),
            $eBtnCerrarLista2: $('#modalEditLista').find('.modal-header .close'),
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario('');
                this.pintarCamposObligatorios();
                this.consultaNombre();
                this.verItem();
                this.cerrarModalEdicion();
            },
            
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);

                if (opc === 'll') {//Cargar label para lista.
                    self.oItems = '';
                    self.oItems = data;
                    um.destruirDataTable(self.$dataTableLabel, '');
                    um.renderDataTables(self.$dataTableLabel, self.oItems, 'll');
                    um.cargarDataList(self.$dlNomEtiqueta, self.oItems, 'll');
                }

                if (opc === 'nll') {//Nuevo label para lista.
                    if (!$.isEmptyObject(data)) {
                        self.oItems = "";
                        self.oItems = data;
                        um.destruirDataTable(self.$dataTableLabel, '');
                        self.limpiarFormulario('ll');
                        um.renderDataTables(self.$dataTableLabel, self.oItems, 'll');
                        self.pintarCamposObligatorios('ll');
                    }
                }
                
                if (opc === 'lc') {//Cargar listas de chequeo.
                    self.oListas = '';
                    self.oListas = data;
                    um.destruirDataTable(self.$dataTableLista, '');
                    um.renderDataTables(self.$dataTableLista, self.oListas, 'lc');
                }
                
                if (opc === 'nlc') {//Nueva lista de chequeo.
                    if (!$.isEmptyObject(data)) {
                        self.oListas = "";
                        self.oListas = data;
                        um.destruirDataTable(self.$dataTableLista, '');
                        self.limpiarFormulario('lc');
                        um.renderDataTables(self.$dataTableLista, self.oListas, 'lc');
                        self.pintarCamposObligatorios('lc');
                    }
                }
            },
            
            metodosUtiles: function() {
                var self = this;
                
                self.$nomItem.on('keypress keyup', function() {
                    self.$nomItem.val(self.$nomItem.val().toUpperCase());
                });
                
                self.$nomItem.focusout(function(){
                    u.camposObligatorios([self.$nomItem], '2');
                });
                
                self.$eNomLabel.on('keyup keypress', function() {
                    self.$eNomLabel.val(self.$eNomLabel.val().toUpperCase());
                });
                
                self.$eNomLabel.focusout(function(){
                    u.camposObligatorios([self.$eNomLabel], '2');
                });
                
                self.$btnCleanItem.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$nomListCheck.on('keyup keypress', function() {
                    self.$nomListCheck.val(self.$nomListCheck.val().toUpperCase());
                });
                
                self.$nomListCheck.focusout(function(){
                    u.camposObligatorios([self.$nomListCheck], '2');
                });
                
                self.$nomLabel.on('keyup keypress', function() {
                    self.$nomLabel.val(self.$nomLabel.val().toUpperCase());
                });
                
                self.$nomLabel.focusout(function(){
                    u.camposObligatorios([self.$nomLabel], '2');
                });
                
                self.$eNomLista.on('keyup keypress', function() {
                    self.$eNomLista.val(self.$eNomLista.val().toUpperCase());
                });
                
                self.$eNomLista.focusout(function(){
                    u.camposObligatorios([self.$eNomLista], '2');
                });
                
                self.$eNomLabel.on('keyup keypress', function() {
                    self.$eNomLabel.val(self.$eNomLabel.val().toUpperCase());
                });
                
                self.$eNomLabel.focusout(function(){
                    u.camposObligatorios([self.$eNomLabel], '2');
                });
                
                self.$btnCleanLista.on('click', function(e) {
                    e.preventDefault();
                    
                    self.limpiarFormulario();
                });
            },
            
            limpiarFormulario: function(frm) {
                var self = this;
                var elementos;
                
                if (frm === '') {
                    elementos = [self.$nomItem, self.$nomListCheck, self.$nomLabel];
                } else if (frm === 'll') {
                    elementos = [self.$nomItem];
                } else if (frm === 'lc') {
                    elementos = [self.$nomListCheck, self.$nomLabel];
                }
                
                u.limpiarCampos(elementos);

                //self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
                var self = this;
                var elementos = [self.$nomItem, self.$nomListCheck, self.$nomLabel];

                u.camposObligatorios(elementos, '1');
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

                self.$btnSaveItem.on('click', function(e) {
                    e.preventDefault();

                    var campOblig = u.camposObligatorios([self.$nomItem], '2');

                    if (campOblig) {
                        consultas.consultarNombreMaestros(self.$nomItem.val().trim(), 'nuevo', 0, 'ServletLabelList');
                    }
                });
                
                self.$btnSaveLista.on('click', function(e) {
                    e.preventDefault();
                    
                    var campOblig = u.camposObligatorios([self.$nomListCheck], '2');
                    
                    if (campOblig) {
                        consultas.consultarNombreMaestros(self.$nomListCheck.val().trim(), 'nuevo', 0, 'ServletListaCheck');
                    }
                });

                self.$eBtnModificarLabel.on('click', function(e) {
                    e.preventDefault();

                    var nombre = '';
                    var campOblig = u.camposObligatorios([self.$eNomLabel], '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                                if (self.oItems[i].nombreLabel !== self.$eNomLabel.val()) {
                                    nombre = self.$eNomLabel.val().trim();
                                }
                                break;
                            }
                        }

                        consultas.consultarNombreMaestros(nombre, 'editar', self.idItem, 'ServletLabelList');
                    }
                });
            },
                
            agregarRegistro: function(response, frm) {
                var self = this;

                if (frm === 'll') {
                    if (response === 'true') {
                        self.mensajeObligatoriedad({
                            titulo: 'Etiqueta para Lista de Chequeo Existente.',
                            cuerpoMensaje: 'Ya hay una etiqueta con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (response === 'false') {
                        var nombre = self.$nomItem.val().trim();

                        um.guardarRegistro({form: 'label', nombre: nombre}, 'ServletLabelList');
                    }
                } else if (frm === 'lc') {
                    if (response === 'true') {
                        self.mensajeObligatoriedad({
                            titulo: 'Lista de Chequeo Existente.',
                            cuerpoMensaje: 'Ya hay una lista con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (response === 'false') {
                        var nombre = self.$nomListCheck.val().trim();
                        um.guardarRegistro({form: 'listaCheck', tabla: self.$tableNewLabel, nombre: nombre}, 'ServletListaCheck');
                    }
                }
            },
            
            verItem: function() {
                var self = this;

                self.$dataTableLabel.on('click', '#btnView', function(e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomLabel, self.$eTextAreaLabel];

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

                    var coment = self.$eTextAreaLabel.val();

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

                    um.SolicitarModificarRegistro({tabla: '', nombre: nombre, idMaestro: self.idItem, coment: coment, org: self.oItems[j]}, [], [], self.$eBtnCerrarLabel, 'ServletLabelList');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;

                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditLabel.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextAreaLabel.val('');
                    }
                });

                self.$modalEditLabel.on('keydown', function(e) {
                    if (self.banderaModal === 1 && self.$modalEditLabel.is(':visible') && e.keyCode === 27) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextAreaLabel.val('');
                    }
                });

                self.$eBtnCerrarLabel.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextAreaLabel.val('');
                });

                self.$eBtnCerrarLabel2.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextAreaLabel.val('');
                });
            }
        }
    })();
    frmListaC.init();
})(document, window, jQuery)