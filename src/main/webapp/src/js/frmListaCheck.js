(function(document, window, $, undefined) {
    (function() {
        return frmListaC = {
            oItems: '',
            oListas: '',
            idItem: 0,
            idLista: 0,
            bModalLabel: 0,
            bModalLista: 0,
            tEdicionLabel: 'nuevo',
            tEdicionLista: 'nuevo',
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $nomItem: $('#nomItem'),
            $btnSaveItem: $('#btnSaveItem'),
            $btnCleanItem: $('#btnCleanItem'),
            $nomListCheck: $('#nomListCheck'),
            $tableNewLabel: $('#tableNewLabel').find('tbody'),
            $nomLabel: $('#nomLabel'),
            $dlNomEtiqueta: $('#dlNomEtiqueta'),
            $btnAddLineaLabel: $('#btnAddLineaLabel'),
            $btnSaveLista: $('#btnSaveLista'),
            $btnCleanLista: $('#btnCleanLista'),            
            $dataTableLabel: $('#dataTableLabel'),
            $dataTableLista: $('#dataTableLista'),
            $modalEditLabel: $('#modalEditLabel'),
            $eNomItem: $('#eNomItem'),
            $eTextAreaLabel: $('#modalEditLabel').find('textarea'),
            $eBtnModificarLabel: $('#eBtnModificarLabel'),
            $eBtnCerrarLabel: $('#eBtnCerrarModalElabel'),
            $eBtnCerrarLabel2: $('#modalEditLabel').find('.modal-header .close'),
            $modalEditLista: $('#modalEditLista'),
            $eNomLista: $('#eNomLista'),
            $eTableNewLabel: $('#eTableNewLabel').find('tbody'),
            $eNomLabel: $('#eNomLabel'),
            $eDlNomEtiqueta: $('#eDlNomEtiqueta'),
            $eBtnAddLineaLabel: $('#eBtnAddLineaLabel'),
            $eTextAreaLista: $('#modalEditLista').find('textarea'),
            $eBtnModificarLista: $('#eBtnModificarLista'),
            $eBtnCerrarLista: $('#eBtnCerrarModalElista'),
            $eBtnCerrarLista2: $('#modalEditLista').find('.modal-header .close'),
            
            init: function() {
                this.inhabilitarCampos();
                this.metodosUtiles();
                this.limpiarFormulario('');
                this.pintarCamposObligatorios();
                this.agregarLineaLabel();
                this.borrarLineaLabel();
                this.consultaNombre();
                this.verRegistro();
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
                    um.cargarDataList([self.$dlNomEtiqueta, self.$eDlNomEtiqueta], self.oItems, 'll');
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
            
            inhabilitarCampos: function() {
                var self = this;
                
                self.$btnSaveLista.attr('disabled', true);
            },
            
            metodosUtiles: function() {
                var self = this;
                
                self.$nomItem.on('keypress keyup', function() {
                    self.$nomItem.val(self.$nomItem.val().toUpperCase());
                });
                
                self.$nomItem.focusout(function(){
                    u.camposObligatorios([self.$nomItem], '2');
                });
                
                self.$eNomItem.on('keyup keypress', function() {
                    self.$eNomItem.val(self.$eNomItem.val().toUpperCase());
                });
                
                self.$eNomItem.focusout(function(){
                    u.camposObligatorios([self.$eNomItem], '2');
                });
                
                self.$btnCleanItem.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario('ll');
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
                    
                    self.limpiarFormulario('lc');
                });
            },
            
            limpiarFormulario: function(frm) {
                var self = this;
                var elementos = [];
                
                if (frm === '') {
                    elementos = [self.$nomItem, self.$nomListCheck, self.$nomLabel];
                } else if (frm === 'll') {
                    elementos = [self.$nomItem];
                } else if (frm === 'lc') {
                    elementos = [self.$nomListCheck, self.$nomLabel];
                    self.$tableNewLabel.find('tr:gt(0)').remove();
                }
                
                u.limpiarCampos(elementos);

                //self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
                var self = this;
                var elementos = [self.$nomItem, self.$nomListCheck, self.$nomLabel];

                u.camposObligatorios(elementos, '1');
            },
            
            agregarLineaLabel: function() {
                var self = this;                
                var trTemplate = '<tr>' +
                                    '<td style="text-align: center">:idLabel:</td>' +
                                    '<td>:nomLabel:</td>' +
                                    '<td>' +
                                        '<button type="button" class="btn" id="btnDelLinea">' +
                                            '<i class="fa fa-trash-o"></i>' +
                                        '</button>' +
                                    '</td>' +
                                 '</tr>';
                
                self.$btnAddLineaLabel.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomLabel = self.$nomLabel.val();
                    var campOblig = u.camposObligatorios([self.$nomLabel], '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (nomLabel === self.oItems[i].nombreLabel) {
                                var newTr = trTemplate
                                        .replace(':idLabel:', self.oItems[i].idLabel)
                                        .replace(':nomLabel:', self.oItems[i].nombreLabel);

                                self.$tableNewLabel.append(newTr);
                                break;
                            }
                        }
                       
                        u.limpiarCampos([self.$nomLabel]);

                        self.$btnSaveLista.attr('disabled', false);
                    }
                });
                
                self.$eBtnAddLineaLabel.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomLabel = self.$eNomLabel.val();
                    var campOblig = u.camposObligatorios([self.$eNomLabel], '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (nomLabel === self.oItems[i].nombreLabel) {
                                var newTr = trTemplate
                                        .replace(':idLabel:', self.oItems[i].idLabel)
                                        .replace(':nomLabel:', self.oItems[i].nombreLabel);

                                self.$eTableNewLabel.append(newTr);
                                break;
                            }
                        }
                       
                        u.limpiarCampos([self.$eNomLabel]);
                    }
                });
            },
            
            borrarLineaLabel: function() {
                var self = this;
                
                self.$tableNewLabel.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    
                    fila.remove();
                    
                    if (self.$tableNewLabel.find('tr').length - 1 === 0) {
                        self.$btnSaveLista.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$eTableNewLabel.on('click', '#btnDelLinea', function (e){
                    var fila = $(this).closest('tr');
                    
                    fila.remove();
                    
                    e.stopPropagation();
                });
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
                    var campOblig = u.camposObligatorios([self.$eNomItem], '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                                if (self.oItems[i].nombreLabel !== self.$eNomItem.val()) {
                                    nombre = self.$eNomItem.val().trim();
                                }
                                break;
                            }
                        }

                        consultas.consultarNombreMaestros(nombre, 'editar', self.idItem, 'ServletLabelList');
                    }
                });
                
                self.$eBtnModificarLista.on('click', function(e) {
                    e.preventDefault();

                    var nombre = '';
                    var campOblig = u.camposObligatorios([self.$eNomLista], '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oListas.length; i++) {
                            if (self.oListas[i].idNomLista === parseInt(self.idLista)) {
                                if (self.oListas[i].nomListaCheck !== self.$eNomLista.val()) {
                                    nombre = self.$eNomLista.val().trim();
                                }
                                break;
                            }
                        }

                        consultas.consultarNombreMaestros(nombre, 'editar', self.idLista, 'ServletListaCheck');
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
                        um.guardarRegistro({form: 'listaCheck', tabla: $('#tableNewLabel'), nombre: nombre}, 'ServletListaCheck');
                    }
                }
            },
            
            verRegistro: function() {
                var self = this;

                self.$dataTableLabel.on('click', '#btnView', function(e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomItem, self.$eTextAreaLabel];
                    self.bModalLabel = 1;
                    self.idItem = parseInt(fila[0].cells[0].textContent);
                    
                    u.limpiarCampos(elementos);

                    for (var i = 0; i < self.oItems.length; i++) {
                        if (self.oItems[i].idLabel === self.idItem) {
                            self.$eNomItem.val(self.oItems[i].nombreLabel);
                            break;
                        }
                    }

                    self.$modalEditLabel.modal('show', 'slow');

                    u.camposObligatorios(elementos, '3');

                    e.stopPropagation();
                });
                
                self.$dataTableLista.on('click', '#btnView', function(e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomLista, self.$eNomLabel, self.$eTextAreaLista];
                    self.bModalLista = 1;
                    self.idLista = parseInt(fila[0].cells[0].textContent);
                    var trTemplate = '<tr>' +
                                        '<td style="text-align: center">:idLabel:</td>' +
                                        '<td>:nomLabel:</td>' +
                                        '<td>' +
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</td>' +
                                     '</tr>';
                    
                    self.$eTableNewLabel.find('tr:gt(0)').remove();
                    u.limpiarCampos(elementos);
                    
                    for (var i = 0; i < self.oListas.length; i++) {
                        if (self.oListas[i].idNomLista === self.idLista) {
                            self.$eNomLista.val(self.oListas[i].nomListaCheck);
                            var label = self.oListas[i].idLabel.split('-');
                            break;
                        }
                    }
                    
                    for (var i = 0; i < label.length; i++) {
                        for (var j = 0; j < self.oItems.length; j++) {
                            if (parseInt(label[i]) === self.oItems[j].idLabel) {
                                var newTr = trTemplate.replace(':idLabel:', self.oItems[j].idLabel)
                                                      .replace(':nomLabel:', self.oItems[j].nombreLabel);
                    
                                self.$eTableNewLabel.append(newTr);
                                break;
                            }
                        }
                    }
                    
                    self.$modalEditLista.modal('show', 'slow');                    
                    u.camposObligatorios(elementos, '3');
                    
                    e.stopPropagation();
                });
                
            },
            
            solicitarModificarRegistro: function(response, frm) {
                var self = this;
                
                if (frm === 'll') {
                    
                    if (response === 'true') {
                        self.mensajeObligatoriedad({
                            titulo: 'Etiqueta para Lista de Chequeo Existente.',
                            cuerpoMensaje: 'Ya hay una etiqueta con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (response === 'false') {
                        var nombre = '';
                        var j = 0;

                        var coment = self.$eTextAreaLabel.val();

                        for (var i = 0; i < self.oItems.length; i++) {
                            if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                                j = i;
                                if (self.oItems[i].nombreLabel !== self.$eNomItem.val()) {
                                    nombre = self.$eNomItem.val().trim();
                                } else {
                                    nombre = self.oItems[i].nombreLabel;
                                }
                                break;
                            }
                        }

                        um.SolicitarModificarRegistro({tabla: '', nombre: nombre, idMaestro: self.idItem, coment: coment, org: self.oItems[j]}, [], [], self.$eBtnCerrarLabel, 'ServletLabelList');
                    }
                    
                } else if (frm === 'lc') {
                    
                    if (response === 'true') {
                        self.mensajeObligatoriedad({
                            titulo: 'Lista de Chequeo Existente.',
                            cuerpoMensaje: 'Ya hay una lista con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (response === 'false') {
                        var nombre = '';
                        var j = 0;

                        var coment = self.$eTextAreaLista.val();

                        for (var i = 0; i < self.oListas.length; i++) {
                            if (self.oListas[i].idNomLista === parseInt(self.idLista)) {
                                j = i;
                                if (self.oListas[i].nomListaCheck !== self.$eNomLista.val()) {
                                    nombre = self.$eNomLista.val();
                                } else {
                                    nombre = self.oListas[i].nomListaCheck;
                                }

                                break;
                            }
                        }

                        um.SolicitarModificarRegistro({tabla: $('#eTableNewLabel'), nombre: nombre, idMaestro: self.idLista, coment: coment, org: self.oListas[j]}, [], [], self.$eBtnCerrarLista, 'ServletListaCheck');
                    }
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;

                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.bModalLabel === 1 && self.$modalEditLabel.is(':hidden')) {
                        self.bModalLabel = 0;
                        self.tEdicionLabel = 'nuevo';
                        self.$eTextAreaLabel.val('');
                    }
                    
                    if (self.bModalLista === 1 && self.$modalEditLista.is(':hidden')) {
                        self.bModalLista = 0;
                        self.tEdicionLista = 'nuevo';
                        self.$eTextAreaLista.val('');
                    }
                });

                self.$modalEditLabel.on('keydown', function(e) {
                    if (self.bModalLabel === 1 && self.$modalEditLabel.is(':visible') && e.keyCode === 27) {
                        self.bModalLabel = 0;
                        self.tEdicionLabel = 'nuevo';
                        self.$eTextAreaLabel.val('');
                    }
                });
                
                self.$modalEditLista.on('keydown', function(e) {
                    if (self.bModalLista === 1 && self.$modalEditLista.is(':visible') && e.keyCode === 27) {
                        self.bModalLista = 0;
                        self.tEdicionLista = 'nuevo';
                        self.$eTextAreaLista.val('');
                    }
                });

                self.$eBtnCerrarLabel.on('click', function(e) {
                    e.preventDefault();
                    self.bModalLabel = 0;
                    self.tEdicionLabel = 'nuevo';
                    self.$eTextAreaLabel.val('');
                });
                
                self.$eBtnCerrarLista.on('click', function(e) {
                    e.preventDefault();
                    self.bModalLista = 0;
                    self.tEdicionLista = 'nuevo';
                    self.$eTextAreaLista.val('');
                });

                self.$eBtnCerrarLabel2.on('click', function(e) {
                    e.preventDefault();
                    self.bModalLabel = 0;
                    self.tEdicionLabel = 'nuevo';
                    self.$eTextAreaLabel.val('');
                });
            }
        }
    })();
    frmListaC.init();
})(document, window, jQuery)