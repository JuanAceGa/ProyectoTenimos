(function(document, window, $, undefined) {
    (function() {
        return frmProceso = {
            UrlProcesos: 'http://localhost:8084/ERPTenimosBackend/rest/procesos/',
            UrlCurvas: 'http://localhost:8084/ERPTenimosBackend/rest/curvas/',
            //oFibras: {},
            oCurvas: {},
            oProcesos: {},
            $dataTableNewCurva: $('#dataTableNewCurva'),
            $tBodyNewCurva: $('#dataTableNewCurva').find('tbody'),
            $dataTableProceso: $('#dataTableProceso'),
            $nomProceso: $('#nomProceso'),
            $tiempoProceso: $('#tiempoProceso'),
            $codCurva: $('#codCurva'),
            $nomCurva: $('#nomCurva'),
            $dlCodCurva: $('#dlCodCurva'),
            $dlNomCurva: $('#dlNomCurva'),
            $btnAddLineaCurva: $('#btnAddLineaCurva'),
            $btnSaveProceso: $('#btnSaveProceso'),
            $btnCleanProceso: $('#btnCleanProceso'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditProceso: $('#modalEditProceso'),
            $eNomProceso: $('#eNomProceso'),
            $eTiempoProceso: $('#eTiempoProceso'),
            $eTableEditCurva: $('#eTableEditCurva'),
            $eTableEditTbody:  $('#eTableEditCurva').find('tbody'),
            $eCodCurva: $('#eCodCurva'),
            $eDlCodCurva: $('#eDlCodCurva'),
            $eNomCurva: $('#eNomCurva'),
            $eDlNomCurva: $('#eDlNomCurva'),
            $eBtnAddLineaCurva: $('#eBtnAddLineaCurva'),
            $eTextArea: $('#modalEditProceso').find('textarea'),
            $eBtnModificarCur: $('#eBtnEditCurva'),
            $eBtnRestCurva: $('#eBtnRestCurva'),
            $eBtnCerrarModalEditCur: $('#eBtnCerrarModalEditCur'),
            $eBtnCerrar2: $('#modalEditProceso').find('.modal-header .close'),
            idProceso: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            idCurvas: '',
            
            init: function() {
                this.inhabilitarCampos();
                this.coincidenciaCurvas();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.agregarLineaCurva();
                this.borrarLineaCurva();
                this.consultaNombreProceso();
                this.verProceso();
                this.cerrarModalEdicion();
            },
            
            consultasProcesos: function() {
                var self = this;

                $.get(self.UrlProcesos + 'listaProcesos', function(res) {
                    self.cargarDatos(res, 'pr');
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'procesos/listaProcesos');
                });

                $.get(self.UrlCurvas + 'listadoCurvas', function(res) {
                    self.cargarDatos(res, 'c');
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'curvas/listaCurvas');
                });
            },
            
            cargarDatos: function(data, opc) {
                var self = this;
                var elementos;
                
                if (opc === 'c') {
                    self.oCurvas = '';
                    self.oCurvas = data;
                    elementos = [self.$dlCodCurva, self.$dlNomCurva];
                    um.cargarDataList(elementos, self.oCurvas, 'c');
                    
                    elementos = [self.$eDlCodCurva, self.$eDlNomCurva];
                    um.cargarDataList(elementos, self.oCurvas, 'c');
                }

                if (opc === 'pr') {
                    self.oProcesos = '';
                    self.oProcesos = data;
                    um.destruirDataTable(self.$dataTableProceso.dataTable(), '5');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTableProceso, self.oProcesos, 'proc');
                    self.pintarCamposObligatorios();
                }

                /*if (opc === 'npr') {
                    if (data !== null) {
                        self.oProcesos = "";
                        self.oProcesos = data;
                        um.destruirDataTable(self.$dataTableProceso.dataTable(), '5');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableProceso, self.oProcesos, 'proc');
                        self.pintarCamposObligatorios();
                    }
                }*/
            },
            
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSaveProceso.attr('disabled', true);
                self.$tiempoProceso.val('0');
            },
            
            coincidenciaCurvas: function() {
                var self = this;

                $(self.$codCurva).on("keyup keypress change", function() {
                    var fila = $(this).closest('tr');
                    
                    self.$nomCurva.val("");
                    
                    um.cargarCoincidenciaCurvas('cod', [self.$codCurva, self.$nomCurva, fila], self.oCurvas);
                });

                $(self.$nomCurva).on('keyup keypress change', function() {
                    var fila = $(this).closest('tr');
                    
                    self.$codCurva.val("");
                    
                    um.cargarCoincidenciaCurvas('nom', [self.$nomCurva, self.$codCurva, fila], self.oCurvas);
                });

                $(self.$eCodCurva).on("keyup keypress change", function() {
                    var fila = $(this).closest('tr');
                    
                    self.$eNomCurva.val("");
                    
                    um.cargarCoincidenciaCurvas('cod', [self.$eCodCurva, self.$eNomCurva, fila], self.oCurvas);
                });

                $(self.$eNomCurva).on('keyup keypress change', function() {
                    var fila = $(this).closest('tr');
                    
                    self.$eCodCurva.val("");
                    
                    um.cargarCoincidenciaCurvas('nom', [self.$eNomCurva, self.$eCodCurva, fila], self.oCurvas);
                });
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomProceso.on('focusin', function() {
                    self.$nomProceso.css('text-transform', 'uppercase');
                });
                
                self.$nomProceso.on('focusout', function() {
                    u.camposObligatorios([self.$nomProceso], '4');
                    
                    (self.$nomProceso.val() === '') ? self.$nomProceso.css('text-transform', '') : '';
                });

                self.$nomCurva.on('focusin', function() {
                    self.$nomCurva.css('text-transform', 'uppercase');
                });
                
                self.$nomCurva.on('focusout', function(){
                    u.camposObligatorios([self.$nomCurva], '4');
                    
                    (self.$nomCurva.val() === '') ? self.$nomCurva.css('text-transform', '') : '';
                });

                self.$eNomProceso.on('focusin', function() {
                    self.$eNomProceso.css('text-transform', 'uppercase');
                });
                
                self.$eNomProceso.on('focusout', function(){
                    u.camposObligatorios([self.$eNomProceso], '4');
                    
                    (self.$eNomProceso.val() === '') ? self.$eNomProceso.css('text-transform', '') : '';
                });

                self.$eNomCurva.on('focusout', function() {
                    self.$eNomCurva.css('text-transform', 'uppercase');
                });
                
                self.$eNomCurva.on('focusout', function() {
                    u.camposObligatorios([self.$eNomCurva], '4');
                    
                    (self.$eNomCurva.val() === '') ? self.$eNomCurva.css('text-transform', '') : '';
                });

                self.$codCurva.on('keypress', function(e) {
                    if (e.keyCode < 48 || e.keyCode > 57) {
                        e.preventDefault();
                    }
                });

                self.$eCodCurva.on('keypress', function(e) {
                    if (e.keyCode < 48 || e.keyCode > 57) {
                        e.preventDefault();
                    }
                });

                self.$btnCleanProceso.on('click', function(e) {
                    e.preventDefault();
                    
                    self.limpiarFormulario();
                });
                
                self.$eBtnRestCurva.on('click', function(e) {
                   e.preventDefault();
                   
                   var fila = $('#eTableEditCurva tr:gt(0)');
                   fila[0].cells[2].textContent = '';
                   fila[0].cells[3].textContent = '';
                   fila[0].cells[4].textContent = '';
                   
                   var elementos = [self.$eCodCurva, self.$eNomCurva];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaCurva);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            
            limpiarFormulario: function() {
                var self = this;
               
                u.limpiarCampos([self.$nomProceso, self.$codCurva, self.$nomCurva]);

                self.$dataTableNewCurva.find('tbody tr:gt(1)').remove();
                var fila = self.$dataTableNewCurva.find('tr:gt(0)');
                fila[0].cells[2].textContent = '';
                fila[0].cells[3].textContent = '';
                fila[0].cells[4].textContent = '';
                
//                self.curvasPorProceso = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              
              u.camposObligatorios([self.$nomProceso, self.$codCurva, self.$nomCurva], '1');
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
                    try {
                        
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
                    } catch (e) {
                        alert(m.mensaje);
                    }
                }
            },
            
            agregarLineaCurva: function() {
                var self = this;
                
                var trTemplate = '<tr>' +
                                    '<td style="text-align: center">:codCurva:</td>' +
                                    '<td>:nomCurva:</td>' +
                                    '<td style="text-align: center">:tiempo:</td>' +
                                    '<td style="text-align: center">:Llenado:</td>' +
                                    '<td style="text-align: center">:rinse:</td>' +
                                    '<td>' +
                                        '<div class="form-group col-md-12">' +
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                 '</tr>';                
                
                self.$btnAddLineaCurva.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var t = parseInt(fila[0].cells[2].textContent);
                    var campOblig = false;
                    
                    campOblig = u.camposObligatorios([self.$codCurva, self.$nomCurva], '2');

                    if (campOblig) {
                        
                        var newTr = trTemplate
                                    .replace(':codCurva:', self.$codCurva.val())
                                    .replace(':nomCurva:', self.$nomCurva.val())
                                    .replace(':tiempo:', fila[0].cells[2].textContent)
                                    .replace(':Llenado:', fila[0].cells[3].textContent)
                                    .replace(':rinse:', fila[0].cells[4].textContent);
                    
                        self.$tBodyNewCurva.append(newTr);
                        
                        self.$tiempoProceso.val(parseInt(self.$tiempoProceso.val()) + t);
                        
                        u.limpiarCampos([self.$codCurva, self.$nomCurva]);
                        fila[0].cells[2].textContent = "";
                        fila[0].cells[3].textContent = "";
                        fila[0].cells[4].textContent = "";

                        self.$btnSaveProceso.attr('disabled', false);
                    }
                });
                
                self.$eBtnAddLineaCurva.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var campOblig = false;
                    var t = parseInt(fila[0].cells[2].textContent);

                    campOblig = u.camposObligatorios([self.$eCodCurva, self.$eNomCurva], '2');

                    if (campOblig) {
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            
                            var newTr = trTemplate
                                    .replace(':codCurva:', self.$eCodCurva.val())
                                    .replace(':nomCurva:', self.$eNomCurva.val())
                                    .replace(':tiempo:', fila[0].cells[2].textContent)
                                    .replace(':Llenado:', fila[0].cells[3].textContent)
                                    .replace(':rinse:', fila[0].cells[4].textContent);
                    
                            self.$eTableEditTbody.append(newTr);

                            self.$eTiempoProceso.val(parseInt(self.$eTiempoProceso.val()) + t);

                            u.limpiarCampos([self.$eCodCurva, self.$eNomCurva]);
                            fila[0].cells[2].textContent = "";
                            fila[0].cells[3].textContent = "";
                            fila[0].cells[4].textContent = "";   
                        }
                    }
                });
            },
            
            borrarLineaCurva: function() {
                var self = this;
                
                self.$dataTableNewCurva.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var t = parseInt(fila[0].cells[2].textContent);
                    
                    self.$tiempoProceso.val(parseInt(self.$tiempoProceso.val()) - t);
                    
                    fila.remove();
                    
                    if (self.$dataTableNewCurva.find('tbody tr').length - 1 === 0) {
                        self.$btnSaveProceso.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$eTableEditTbody.on('click', '#btnDelLinea', function (e){
                    var fila = $(this).closest('tr');
                    var t = parseInt(fila[0].cells[2].textContent);
                    
                    self.$eTiempoProceso.val(parseInt(self.$eTiempoProceso.val()) - t);
                    
                    fila.remove();
                    
                    e.stopPropagation();
                });
            },
            
            consultaNombreProceso: function(){
                var self = this;

                self.$btnSaveProceso.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = u.camposObligatorios([self.$nomProceso], '2');

                    if (campObligPrep) {
                        var n = self.$nomProceso.val().trim();
                        self.consultarNombresProceso(n.toUpperCase(), 'nuevo', 0);
                    }
                });
                
                self.$eBtnModificarCur.on("click", function(e) {
                    e.preventDefault();
                    
                    var campOblig = u.camposObligatorios([self.$eNomProceso, self.$eTiempoProceso], '2');

                    if (campOblig) {
                        var n = self.$eNomProceso.val().trim();
                        
                        /*for (var i = 0; i < self.oProcesos.length; i++) {
                            if (self.oProcesos[i].idProceso === parseInt(self.idProceso)) {
                                if (self.oProcesos[i].nomProceso !== self.$eNomProceso.val()) {
                                    n = self.$eNomProceso.val();
                                }
                                break;
                            }
                        }*/
                        self.consultarNombresProceso(n.toUpperCase(), 'editar', self.idProceso);
                    }
                });
            },
            
            consultarNombresProceso: function(n, t, i) {
                var self = this;
                
                $.get(self.UrlProcesos + 'buscarNombre', {
                    nombre: n,
                    tipo: t,
                    idMaestro: i
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarProceso(res);
                    } else {
                        self.solicitarModificarProceso(res);
                    }

                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'procesos/buscarNombre');
                });
            },
            
            agregarProceso: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeObligatoriedad({
                        tipo: 'modal',
                        titulo: 'Nombre de Proceso Existente.',
                        mensaje: 'Ya hay proceso con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var nombre = self.$nomProceso.val();
                    self.obtenerDatosDeTabla(self.$dataTableNewCurva);
                    
                    var datos = {};
                    datos.nomProceso = nombre.trim();
                    datos.idCurvas = self.idCurvas;
                    datos.idUsuario = usuario.idUsuario.idPersonal;
                    
                    $.get(self.UrlProcesos + 'guardar', {
                        datos: JSON.stringify(datos)
                    }, function(res){
                        if (res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'Registro Guardado',
                                mensaje: '¡Se ha guardado satisfactoriamente!',
                                clase: "growl-success",
                            });
                            
                            $.get(self.UrlProcesos + 'listaProcesos', function(res) {
                                self.cargarDatos(res, 'pr');
                            }).fail(function(res, status, er){
                                self.errorDeConexion(res, status, er, 'procesos/listaProcesos');
                            });
                            
                        } else if (!res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'Registro No Guardado',
                                mensaje: '¡No se ha guardado el registro!',
                                clase: 'growl-danger'
                            });
                        }
                        
                    }).fail(function(res, status, er) {
                        self.errorDeConexion(res, status, er, 'procesos/guardar');
                    });
                }
            },
            
            obtenerDatosDeTabla: function(tabla) {
                var self = this;
                
                $(tabla).find('tbody tr').each(function(index) {
                    if (index > 0) {
                        $(this).children('td').each(function(index2) {
                            switch (index2) {
                                case 0: //Id Curva
                                    if (self.idCurvas === '') {
                                        self.idCurvas = $(this).text();
                                    } else {
                                        self.idCurvas += "-" + $(this).text();
                                    }
                                    break;
                            }
                        });
                    }
                });
            },
            
            verProceso: function() {
                var self = this;

                self.$dataTableProceso.on('click', '#btnView', function (e) {
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomProceso, self.$eTiempoProceso, self.$eCodCurva, self.$eNomCurva];
                    var trTemplate = '<tr>' +
                                        '<td style="text-align: center">:codCurva:</td>' +
                                        '<td>:nomCurva:</td>' +
                                        '<td style="text-align: center">:tiempo:</td>' +
                                        '<td style="text-align: center">:llenado:</td>' +
                                        '<td style="text-align: center">:rinse:</td>' +
                                        '<td>' +
                                            '<div class="form-group col-md-12">' +
                                                '<button type="button" class="btn" id="btnDelLinea">' +
                                                    '<i class="fa fa-trash-o"></i>' +
                                                '</button>' +
                                            '</div>' +
                                        '</td>' +
                                     '</tr>';   
                    
                    self.banderaModal = 1;
                    self.idProceso = parseInt(fila[0].cells[0].textContent);
                    
                    $("#eTableEditCurva tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    
                    for (var p = 0; p < self.oProcesos.length; p++) {
                        if (self.oProcesos[p].idProceso === self.idProceso) {
                            self.$eNomProceso.val(self.oProcesos[p].nomProceso);
                            self.$eTiempoProceso.val(self.oProcesos[p].tiempoEst);
                            var curvas = self.oProcesos[p].idCurvas.split('-');
                            break;
                        }
                    }
                    
                    for (var c = 0; c < curvas.length; c++) {
                        for (var i = 0; i < self.oCurvas.length; i++) {
                            if (parseInt(curvas[c]) === self.oCurvas[i].idCurva) {
                                var newTr = trTemplate;
                                var tr = newTr.replace(':codCurva:', self.oCurvas[i].idCurva)
                                                      .replace(':nomCurva:', self.oCurvas[i].nomCurva)
                                                      .replace(':tiempo:', self.oCurvas[i].tiempoCurva)
                                                      .replace(':llenado:', self.oCurvas[i].llenadoCurva)
                                                      .replace(':rinse:', self.oCurvas[i].rinseCurva);
                    
                                self.$eTableEditTbody.append(tr);
                                break;
                            }
                        }
                    }                    
                    
                    self.$modalEditProceso.modal('show', 'slow');
                    u.camposObligatorios(elementos, '3');
                    
                    e.stopPropagation();
                });
                    
            },
            
            solicitarModificarProceso: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Proceso Existente.',
                        mensaje: 'Ya hay proceso con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    self.idCurvas = '';
                    var nombre = '';
                    var j = 0;
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        if (self.oProcesos[i].idProceso === parseInt(self.idProceso)) {
                            j = i;
                            if (self.oProcesos[i].nomProceso !== self.$eNomProceso.val()) {
                                nombre = self.$eNomProceso.val().trim();
                            } else {
                                nombre = self.oProcesos[i].nomProceso;
                            }
                            
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$eTableEditCurva, nombre: nombre, idMaestro: self.idProceso, coment: coment, org: self.oProcesos[j]}, [], [], self.$eBtnCerrarModalEditCur, 'ServletProcesos');
                    
                    self.obtenerDatosDeTabla(self.$eTableEditCurva);
                    
                    var idCurvas = self.oProcesos[j].idCurvas.split('-');
                    var idCurvasN = self.idCurvas.split('-');
                    var c = 0;
                    
                    for (var i = 0; i < idCurvas.length; i++) {
                        for (var x = 0; x < idCurvasN.length; x++) {
                            if (idCurvasN[x] === idCurvas[i]) {
                                c++;
                                break;
                            }
                        }
                    }
                    
                    if (c > 0) {
                        var usuario = JSON.parse(sessionStorage.user);
                        var datos = {};
                        datos.idProceso = self.idProceso;
                        datos.nomProceso = nombre;
                        datos.idCurvas = self.idCurvas;
                        datos.idUsuario = usuario.idUsuario.idPersonal;
                        
                        $.get(self.UrlProcesos + 'editar', {
                            datos: JSON.stringify(datos)
                        }, function(res) {
                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'Modificar Registro',
                                    mensaje: '¡Solicitud enviada con éxito.!'
                                });
                                
                                $.get(self.UrlProcesos + 'listaProcesos', function(res) {
                                    self.cargarDatos(res, 'pr');
                                }).fail(function(res, status, er){
                                    self.errorDeConexion(res, status, er, 'procesos/listaProcesos');
                                });
                                
                                self.$eBtnCerrarModalEditCur.click();

                            } else {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'Modificar Registro',
                                    mensaje: '¡No se entregó la solicitud de modificación.!',
                                    clase: 'growl-danger'
                                });
                            }
                        }).fail(function(res, status, er) {
                            self.errorDeConexion(res, status, er, 'procesos/guardar');
                        });
                    }
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditProceso.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
               self.$modalEditProceso.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditProceso.is(':visible') && e.keyCode === 27) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$eBtnCerrarModalEditCur.on('click', function(e) {
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
            
            errorDeConexion: function(res, status, er, serv){
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

    frmProceso.init();

})(document, window, jQuery)