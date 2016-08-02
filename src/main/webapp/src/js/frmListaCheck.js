(function(document, window, $, undefined) {
    (function() {
        return frmListaC = {
            UrlLabelCheck: 'http://localhost:8084/ERPTenimosBackend/rest/listaCheck/',
            UrlListaCheck: 'http://localhost:8084/ERPTenimosBackend/rest/nombreListCheck/',
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
            
            consultasListaCheck: function() {
                var self = this;
                
                $.get(self.UrlLabelCheck + 'listadoItems', function(res) {
                    self.cargarDatos(res, 'll');
                
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'labelCheck/listadoItems');
                });
                    
                $.get(self.UrlListaCheck + 'listadoListCheck', function(res) {
                    self.cargarDatos(res, 'lc');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'nombreListCheck/listadoListCheck');
                });
            },
            
            cargarDatos: function(data, opc) {
                var self = this;
                
                if (opc === 'll') {//Cargar label para lista.
                    if (!$.isEmptyObject(data)) {
                        self.oItems = '';
                        self.oItems = data;
                        um.destruirDataTable(self.$dataTableLabel, '');
                        self.limpiarFormulario('ll');
                        um.renderDataTables(self.$dataTableLabel, self.oItems, 'll');
                        um.cargarDataList([self.$dlNomEtiqueta, self.$eDlNomEtiqueta], self.oItems, 'll');
                        self.pintarCamposObligatorios('ll');
                    }
                }
                
                if (opc === 'lc') {//Cargar listas de chequeo.
                    if (!$.isEmptyObject(data)) {
                        self.oListas = '';
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
                
                self.$nomItem.on('focusin', function() {
                    self.$nomItem.css('text-transform', 'uppercase');
                });
                
                self.$nomItem.on('focusout', function(){
                    u.camposObligatorios([self.$nomItem], '4');
                    
                    (self.$nomItem.val() === '') ? self.$nomItem.css('text-transform', '') : '';
                });
                
                self.$eNomItem.on('focusin', function() {
                    self.$eNomItem.css('text-transform', 'uppercase');
                });
                
                self.$eNomItem.on('focusout', function(){
                    u.camposObligatorios([self.$eNomItem], '4');
                    
                    (self.$eNomItem.val() === '') ? self.$eNomItem.css('text-transform', '') : '';
                });
                
                self.$btnCleanItem.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario('ll');
                });
                
                self.$nomListCheck.on('focusin', function() {
                    self.$nomListCheck.css('text-transform', 'uppercase');
                });
                
                self.$nomListCheck.on('focusout', function(){
                    u.camposObligatorios([self.$nomListCheck], '4');
                    
                    (self.$nomListCheck.val() === '') ? self.$nomListCheck.css('text-transform', '') : '';
                });
                
                self.$nomLabel.on('focusin', function() {
                    self.$nomLabel.css('text-transform', 'uppercase');
                });
                
                self.$nomLabel.on('focusout', function(){
                    u.camposObligatorios([self.$nomLabel], '4');
                    
                    (self.$nomLabel.val() === '') ? self.$nomLabel.css('text-transform', '') : '';
                });
                
                self.$eNomLista.on('focusin', function() {
                    self.$eNomLista.css('text-transform', 'uppercase');
                });
                
                self.$eNomLista.on('focusout', function(){
                    u.camposObligatorios([self.$eNomLista], '4');
                    
                    (self.$eNomLista.val() === '') ? self.$eNomLista.css('text-transform', '') : '';
                });
                
                self.$eNomLabel.on('focusin', function() {
                    self.$eNomLabel.css('text-transform', 'uppercase');
                });
                
                self.$eNomLabel.on('focusout', function(){
                    u.camposObligatorios([self.$eNomLabel], '4');
                    
                    (self.$eNomLabel.val() === '') ? self.$eNomLabel.css('text-transform', '') : '';
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
                    //var fila = $(this).closest('tr');
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
                    //var fila = $(this).closest('tr');
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
            
            consultaNombre: function() {
                var self = this;

                self.$btnSaveItem.on('click', function(e) {
                    e.preventDefault();

                    var campOblig = u.camposObligatorios([self.$nomItem], '2');

                    if (campOblig) {
                        var n = self.$nomItem.val().trim();
                        
                        self.consultarNombresListaLabel(n.toUpperCase(), 'nuevo', 0, 'label');
                    }
                });
                
                self.$btnSaveLista.on('click', function(e) {
                    e.preventDefault();
                    
                    var campOblig = u.camposObligatorios([self.$nomListCheck], '2');
                    
                    if (campOblig) {
                        var n = self.$nomListCheck.val().trim();
                        
                        self.consultarNombresListaLabel(n.toUpperCase(), 'nuevo', 0, 'lista');
                    }
                });

                self.$eBtnModificarLabel.on('click', function(e) {
                    e.preventDefault();

                    var campOblig = u.camposObligatorios([self.$eNomItem], '2');

                    if (campOblig) {
                        var n = self.$eNomItem.val().trim();
                        
                        self.consultarNombresListaLabel(n.toUpperCase(), 'editar', self.idItem, 'label');
                    }
                });
                
                self.$eBtnModificarLista.on('click', function(e) {
                    e.preventDefault();

                    var campOblig = u.camposObligatorios([self.$eNomLista], '2');

                    if (campOblig) {
                        var n = self.$eNomLista.val().trim();

                        self.consultarNombresListaLabel(n.toUpperCase(), 'editar', self.idLista, 'lista');
                    }
                });
            },
            
            consultarNombresListaLabel: function(n, t, i, frm) {
                var self = this;
                var url;
                
                if (frm === 'label') {
                    url = self.UrlLabelCheck;
                } else {
                    url = self.UrlListaCheck;
                }
                    
                $.get(url + 'buscarNombre', {
                    nombre: n,
                    tipo: t,
                    idMaestro: i
                }, function(res) {
                    if (t === 'nuevo') {
                        
                        if (frm === 'label') {
                            self.agregarRegistro(res, 'll');
                        } else {
                            self.agregarRegistro(res, 'lc');
                        }
                        
                    } else {
                        if (frm === 'label') {
                            self.solicitarModificarRegistro(res, 'll');
                        } else {
                            self.solicitarModificarRegistro(res, 'lc');
                        }
                    }

                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, frm + 'listaCheck/buscarNombre');
                });
            },
                
            agregarRegistro: function(res, frm) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                
                if (frm === 'll') {
                    if (res) {
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Etiqueta para Lista de Chequeo Existente.',
                            mensaje: 'Ya hay una etiqueta con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (!res) {
                        var n = self.$nomItem.val().trim();
                        var datos = {};
                        datos.nombreLabel = n.toUpperCase();
                        datos.idUsuario = usuario.idUsuario.idPersonal;
                        
                        $.get(self.UrlLabelCheck + 'guardar', {
                            datos: JSON.stringify(datos)
                        }, function(res){
                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'etiquetaCheck/guardar',
                                    mensaje: '¡Se guardó la etiqueta.!',
                                    clase: "growl-success",
                                });
                                
                                $.get(self.UrlLabelCheck + 'listadoItems', function(res) {
                                    self.cargarDatos(res, 'll');
                                }).fail(function(res, status, er){
                                    self.errorDeConexion(res, status, er, 'etiquetaCheck/listadoItems');
                                });
                                
                                self.limpiarFormulario('ll');
                            
                            } else if (!res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'etiquetaCheck/guardar',
                                    mensaje: '¡No se guardó la etiqueta.!',
                                    clase: 'growl-danger'
                                });
                            }
                        }).fail(function(res, status, er) {
                            self.errorDeConexion(res, status, er, 'labelCheck/guardar');
                        });
                    }
                } else if (frm === 'lc') {
                    if (res) {
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Lista de Chequeo Existente.',
                            mensaje: 'Ya hay una lista con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (!res) {
                        var n = self.$nomListCheck.val().trim();
                        var datos = {};
                        
                        datos.nomListaCheck = n.toUpperCase();
                        datos.idLabel = self.obtenerDatosTablaLabelLista($('#tableNewLabel'));
                        datos.idUsuario = usuario.idUsuario.idPersonal;
                        
                        $.get(self.UrlListaCheck + 'guardar', {
                            datos: JSON.stringify(datos)
                        }, function(res){
                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'listaCheck/guardar',
                                    mensaje: '¡Se guardó la lista de chequeo.!',
                                    clase: "growl-success",
                                });
                                
                                $.get(self.UrlListaCheck + 'listadoListCheck', function(res) {
                                    self.cargarDatos(res, 'lc');

                                }).fail(function(res, status, er){
                                    self.errorDeConexion(res, status, er, 'listaCheck/listadoListCheck');
                                });
                                
                                self.limpiarFormulario('lc');
                            
                            } else if (!res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'listaCheck/guardar',
                                    mensaje: '¡No se guardó la lista de chequeo.!',
                                    clase: 'growl-danger'
                                });
                            }

                        }).fail(function(res, status, er) {
                            self.errorDeConexion(res, status, er, 'listaCheck/guardar');
                        });
                    }
                }
            },
            
            obtenerDatosTablaLabelLista: function(tabla) {
                var self = this;
                var idRegistros = '';
                
                $(tabla).find('tbody tr').each(function(index) {
                    if (index > 0) {
                        $(this).children('td').each(function(index2) {
                            switch (index2) {
                                case 0: //Id Lista Chequeo
                                    if (idRegistros === '') {
                                        idRegistros = $(this).text();
                                    } else {
                                        idRegistros += "-" + $(this).text();
                                    }
                                    break;
                            }
                        });
                    }
                });
                
                return idRegistros;
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
            
            solicitarModificarRegistro: function(res, frm) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                
                if (frm === 'll') {                    
                    if (res) {
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Etiqueta para Lista de Chequeo Existente.',
                            mensaje: 'Ya hay una etiqueta con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (!res) {
                        var n = self.$eNomItem.val().trim();
                        var coment = self.$eTextAreaLabel.val();
                        var datos = {};
                        datos.idLabel = self.idItem;
                        datos.nombreLabel = '';
                        datos.idUsuario = usuario.idUsuario.idPersonal;
                        
                        for (var i = 0; i < self.oItems.length; i++) {
                            if (self.oItems[i].idLabel === parseInt(self.idItem)) {
                                if (self.oItems[i].nombreLabel !== n.toUpperCase()) {
                                    datos.nombreLabel = n.toUpperCase();
                                    
                                    $.get(self.UrlLabelCheck + 'editar', {
                                        datos: JSON.stringify(datos)
                                    }, function(res) {
                                        if (res) {
                                            self.mensajeModalAndGritter({
                                                tipo: 'gritter',
                                                titulo: 'labelCheck/editar',
                                                mensaje: '¡Se modificó la etiqueta.!'
                                            });

                                            $.get(self.UrlLabelCheck + 'listadoItems', function(res) {
                                                self.cargarDatos(res, 'll');
                                            }).fail(function(res, status, er){
                                                self.errorDeConexion(res, status, er, 'labelCheck/listadoItems');
                                            });

                                            self.$eBtnCerrarLabel.click();

                                        } else {
                                            self.mensajeModalAndGritter({
                                                tipo: 'gritter',
                                                titulo: 'labelCheck/editar',
                                                mensaje: '¡No se modificó la etiqueta.!',
                                                clase: 'growl-danger'
                                            });
                                        }
                                    }).fail(function(res, status, er) {
                                        self.errorDeConexion(res, status, er, 'labelCheck/editar');
                                    });
                                    
                                } else {
                                    self.mensajeModalAndGritter({
                                        tipo: 'gritter',
                                        titulo: "labelCheck/editar",
                                        mensaje: "¡No hay datos a modificar.!",
                                        clase: "growl-warning"                            
                                    });
                                }
                                break;
                            }
                        }
                    }
                    
                } else if (frm === 'lc') {
                    
                    if (res) {
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Lista de Chequeo Existente.',
                            mensaje: 'Ya hay una lista con ese nombre, por favor intente nuevamente.'
                        });

                    } else if (!res) {
                        var j = 0;
                        var n = self.$eNomLista.val().trim();
                        var coment = self.$eTextAreaLista.val();
                        var idLabel;
                        var idLabelN = self.obtenerDatosTablaLabelLista($('#eTableNewLabel'));
                        var c = 0;
                        var datos = {};
                        datos.idNomLista = self.idLista;
                        datos.idUsuario = usuario.idUsuario.idPersonal;

                        for (var i = 0; i < self.oListas.length; i++) {
                            if (self.oListas[i].idNomLista === parseInt(self.idLista)) {
                                idLabel = self.oListas[i].idLabel;
                                if (self.oListas[i].nomListaCheck !== n.toUpperCase()) {
                                    c++;
                                }

                                break;
                            }
                        }
                        
                        datos.nomListaCheck = n.toUpperCase();
                        datos.idLabel = (idLabel.length > idLabelN.length || idLabel.length < idLabelN.length) ? idLabelN : idLabel;

                        $.get(self.UrlListaCheck + 'editar', {
                            datos: JSON.stringify(datos)
                        }, function(res) {
                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'listaCheck/editar',
                                    mensaje: '¡Se modificó la lista de chequeo.!'
                                });

                                $.get(self.UrlListaCheck + 'listadoListCheck', function(res) {
                                    self.cargarDatos(res, 'lc');
                                }).fail(function(res, status, er) {
                                    self.errorDeConexion(res, status, er, 'listaCheck/listadoListCheck');
                                });

                                self.$eBtnCerrarLista.click();

                            } else {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'listaCheck/editar',
                                    mensaje: '¡No se modificó la lista de chequeo.!',
                                    clase: 'growl-danger'
                                });
                            }
                        }).fail(function(res, status, er) {
                            self.errorDeConexion(res, status, er, 'listaCheck/editar');
                        });
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
        }
    })();
    frmListaC.init();
})(document, window, jQuery)