(function(document, window, $, undefined) {
    (function() {
        return frmProceso = {
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
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                var elementos = [];
                
                if (opc === 'c') {
                    self.oCurvas = '';
                    self.oCurvas = data;
                    elementos.push(self.$dlCodCurva);
                    elementos.push(self.$dlNomCurva);
                    um.cargarDataList(elementos, self.oCurvas, 'c');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodCurva);
                    elementos.push(self.$eDlNomCurva);
                    um.cargarDataList(elementos, self.oCurvas, 'c');
                }

                if (opc === 'pr') {
                    self.oProcesos = '';
                    self.oProcesos = data;
                    um.destruirDataTable(self.$dataTableProceso.dataTable(), '5');
                    um.renderDataTables(self.$dataTableProceso, self.oProcesos, 'proc');
                }

                if (opc === 'npr') {
                    if (data !== null) {
                        self.oProcesos = "";
                        self.oProcesos = data;
                        um.destruirDataTable(self.$dataTableProceso.dataTable(), '5');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableProceso, self.oProcesos, 'proc');
                        self.pintarCamposObligatorios();
                    }
                }
            },
            
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSaveProceso.attr('disabled', true);
                self.$tiempoProceso.val('0');
            },
            
            coincidenciaCurvas: function() {
                var self = this;

                $(self.$codCurva).on("keyup change", function() {
                    var fila = $(this).closest('tr');
                    
                    self.$nomCurva.val("");
                    var elementos = [self.$codCurva, self.$nomCurva, fila];

                    um.cargarCoincidenciaCurvas('cod', elementos, self.oCurvas);
                });

                $(self.$nomCurva).on('keyup change', function() {
                    var fila = $(this).closest('tr');
                    
                    self.$codCurva.val("");
                    var elementos = [self.$nomCurva, self.$codCurva, fila];
                    
                    um.cargarCoincidenciaCurvas('nom', elementos, self.oCurvas);
                });

                $(self.$eCodCurva).on("keyup change", function() {
                    var fila = $(this).closest('tr');
                    
                    self.$eNomCurva.val("");
                    var elementos = [self.$eCodCurva, self.$eNomCurva, fila];

                    um.cargarCoincidenciaCurvas('cod', elementos, self.oCurvas);
                });

                $(self.$eNomCurva).on('keyup change', function() {
                    var fila = $(this).closest('tr');
                    
                    self.$eCodCurva.val("");
                    var elementos = [self.$eNomCurva, self.$eCodCurva, fila];
                    
                    um.cargarCoincidenciaCurvas('nom', elementos, self.oCurvas);
                });
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomProceso.on('keyup keypress', function() {
                    self.$nomProceso.val(self.$nomProceso.val().toUpperCase());
                });

                self.$nomCurva.on('keyup keypress', function() {
                    self.$nomCurva.val(self.$nomCurva.val().toUpperCase());
                });

                self.$eNomProceso.on('keyup keypress', function() {
                    self.$eNomProceso.val(self.$eNomProceso.val().toUpperCase());
                });

                self.$eNomCurva.on('keyup keypress', function() {
                    self.$eNomCurva.val(self.$eNomCurva.val().toUpperCase());
                });

                self.$codCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
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
                
                var elementos = [self.$nomProceso, self.$codCurva, self.$nomCurva];
                u.limpiarCampos(elementos);

                $('#dataTableNewCurva tr:gt(1)').remove();
                var fila = $('#dataTableNewCurva tr:gt(0)');
                fila[0].cells[2].textContent = '';
                fila[0].cells[3].textContent = '';
                fila[0].cells[4].textContent = '';
                
//                self.curvasPorProceso = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var elementos = [self.$nomProceso, self.$codCurva, self.$nomCurva];
              
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
                    var elementos = [self.$codCurva, self.$nomCurva];
                    
                    campOblig = u.camposObligatorios(elementos, '2');

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
                    var campos = [self.$eCodCurva, self.$eNomCurva];
                    var t = parseInt(fila[0].cells[2].textContent);

                    campOblig = u.camposObligatorios(campos, '2');

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
                    
                    if ($('#dataTableNewCurva tbody tr').length - 1 === 0) {
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
                    var campObligPrep = false;
                    var elementos = [self.$nomProceso];

                    campObligPrep = u.camposObligatorios(elementos, '2');

                    if (campObligPrep) {                        
                        consultas.consultarNombreMaestros(self.$nomProceso.val(), 'nuevo', 0, 'ServletProcesos');
                    }
                });
                
                self.$eBtnModificarCur.on("click", function(e) {
                    e.preventDefault();
                    
                    var nombre = '';
                    var campOblig = false;
                    var elementos = [self.$eNomProceso, self.$eTiempoProceso];

                    campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oProcesos.length; i++) {
                            if (self.oProcesos[i].idProceso === parseInt(self.idProceso)) {
                                if (self.oProcesos[i].nomProceso !== self.$eNomProceso.val()) {
                                    nombre = self.$eNomProceso.val();
                                }
                                break;
                            }
                        }
                        
                        consultas.consultarNombreMaestros(nombre, 'editar', self.idProceso, 'ServletProcesos'); 
                    }
                });
            },
            
            agregarProceso: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Proceso Existente.',
                        cuerpoMensaje: 'Ya hay proceso con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomProceso.val();
                    
                    um.guardarRegistro({form: 'proceso', tabla: self.$dataTableNewCurva, nombre: nombre}, 'ServletProcesos');
                    
                }
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
                                var newTr = trTemplate.replace(':codCurva:', self.oCurvas[i].idCurva)
                                                      .replace(':nomCurva:', self.oCurvas[i].nomCurva)
                                                      .replace(':tiempo:', self.oCurvas[i].tiempoCurva)
                                                      .replace(':llenado:', self.oCurvas[i].llenadoCurva)
                                                      .replace(':rinse:', self.oCurvas[i].rinseCurva);
                    
                                self.$eTableEditTbody.append(newTr);
                                break;
                            }
                        }
                    }                    
                    
                    self.$modalEditProceso.modal('show', 'slow');                    
                    u.camposObligatorios(elementos, '3');
                    
                    e.stopPropagation();
                });
                    
            },
            
            solicitarModificarProceso: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Proceso Existente.',
                        cuerpoMensaje: 'Ya hay proceso con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var j = 0;
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        if (self.oProcesos[i].idProceso === parseInt(self.idProceso)) {
                            j = i;
                            if (self.oProcesos[i].nomProceso !== self.$eNomProceso.val()) {
                                nombre = self.$eNomProceso.val();
                            } else {
                                nombre = self.oProcesos[i].nomProceso;
                            }
                            
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$eTableEditCurva, nombre: nombre, idMaestro: self.idProceso, coment: coment, org: self.oProcesos[j]}, [], [], self.$eBtnCerrarModalEditCur, 'ServletProcesos');
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
            }
        };
    })();

    frmProceso.init();

})(document, window, jQuery)