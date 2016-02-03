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
//            $modalEditPrep: $('#modalEditPreparacion'),
//            $tableEditPrep: $('#tableEditPrep'),
//            $tBodyEditPrep: $('#tableEditPrep').find('tbody'),
//            $eCbxfibraPrep: $('#eCbxfibraPrep'),
//            $eCodQuimPrep: $('#eCodQuimPrep'),
//            $eNomQuimPrep: $('#eNomQuimPrep'),
//            $eNomPrep: $('#eNomPrep'),
//            $eDlCodQuimPrep: $('#eDlCodQuimPrep'),
//            $eDlNomQuimPrep: $('#eDlNomQuimPrep'),
//            $eCantGrLtPrep: $('#eCantGrLtPrep'),
//            $eCantPctjPrep: $('#eCantPctjPrep'),
//            $eTextArea: $('#modalEditPreparacion').find('textarea'),
//            $eBtnAddLineaPrep: $('#eBtnAddLineaPrep'),
//            $eBtnModificar: $('#eBtnEditPrep'),
//            $eBtnRestPrep: $('#eBtnRestPrep'),
//            $eBtnCerrar: $('#eBtnCerrar'),
//            $eBtnCerrar2: $('#modalEditPreparacion').find('.modal-header .close'),
//            quimicosPorPrep: [],
            idProceso: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
//            eNuevosQuimicos: [],
//            eQuimicosModif: [],
//            solicitudesEnviadas: [],
//            solcNombre: false,
//            solcFibra: false,
            
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
                this.modificarCurvaProceso();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                var elementos = [];
                
                if (opc === 'c') {
                    self.oCurvas = data;
                    elementos.push(self.$dlCodCurva);
                    elementos.push(self.$dlNomCurva);
                    um.cargarDataList(elementos, self.oCurvas, 'c');
                    
//                    elementos = [];
//                    elementos.push(self.$eDlCodQuimPrep);
//                    elementos.push(self.$eDlNomQuimPrep);
//                    um.cargarDataList(elementos, self.oCurvas, 'c');
                }

                if (opc === 'pr') {
                    self.oProcesos = data;
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
                
                /*if (opc === 'solic') {
                    if (data !== null) {
                        self.solicitudesEnviadas = data;
                        self.solcNombre = false;
                        self.solcFibra = false;
                        self.verificarSolicitudes();
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

                /*$(self.$eCodQuimPrep).on('keyup keypress change', function() {
                    self.$eNomQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oCurvas);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                    
                });

                $(self.$eNomQuimPrep).on('keyup keypress change', function() {
                    self.$eCodQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimPrep, self.$eCodQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oCurvas);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                });*/
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomProceso.on('keyup keypress', function() {
                    self.$nomProceso.val(self.$nomProceso.val().toUpperCase());
                });

                self.$nomCurva.on('keyup keypress', function() {
                    self.$nomCurva.val(self.$nomCurva.val().toUpperCase());
                });

                /*self.$eNomPrep.on('keyup keypress', function() {
                    self.$eNomPrep.val(self.$eNomPrep.val().toUpperCase());
                });

                self.$eNomQuimPrep.on('keyup keypress', function() {
                    self.$eNomQuimPrep.val(self.$eNomQuimPrep.val().toUpperCase());
                });*/

                self.$codCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                /*self.$eCodQuimPrep.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });*/

                self.$btnCleanProceso.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                /*self.$eBtnRestPrep.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaPrep);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });*/

            },
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$nomProceso, self.$codCurva, self.$nomCurva];
                u.limpiarCampos(elementos);

                $('#dataTableNewCurva tr:gt(1)').remove();
//                self.quimicosPorPrep = [];
//                self.eNuevosQuimicos = [];
//                self.eQuimicosModif = [];
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
                
                self.$btnAddLineaCurva.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var t = parseInt(fila[0].cells[2].textContent);
                    var campObligQuim = false;
                    var elementos = [self.$codCurva, self.$nomCurva];
                    
                    campObligQuim = u.camposObligatorios(elementos, '2');

                    if (campObligQuim) {
                        
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
                
                /*self.$eBtnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', 
                            cuerpoMensaje: 'Los gramos debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$eCodQuimPrep.val(),
                            nomQuim: self.$eNomQuimPrep.val(),
                            cantGrLt: self.$eCantGrLtPrep.val(),
                            cantPctj: self.$eCantPctjPrep.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditPrep;
                            
                            if(parseFloat(self.$eCantGrLtPrep.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtPrep.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjPrep.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimPrep.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'prep', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorPrep);
                            if (!d.existe) {
                                self.quimicosPorPrep.push({codQ: self.$eCodQuimPrep.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimPrep.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimPrep.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtPrep.val(),
                                cantPctjNue: self.$eCantPctjPrep.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep])
                            self.$eCodQuimPrep.attr('disabled', false);
                            self.$eNomQuimPrep.attr('disabled', false);
                            self.filaEditar = null;
                            
                       } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });*/
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
                
                /*self.$tBodyEditPrep.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;
                    var r = um.verificarSolicitudes(codigo, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        var posN = ((rowIndex - 2) - (self.quimicosPorAux.length - self.eNuevosQuimicos.length));
                        
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'prep',
                            codQpermitido: '',
                            pos: (rowIndex - 2)},
                        self.quimicosPorPrep);

                        self.quimicosPorPrep = d.oQuim;

                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'prep',
                            codQpermitido: '', 
                            pos: posN},
                        self.eNuevosQuimicos);

                        self.eNuevosQuimicos = d.oQuim;

                        for (var i = 0; i < self.eQuimicosModif.length; i++) {
                            if (self.eQuimicosModif[i].codQ === fila[0].cells[0].textContent) {
                                self.eQuimicosModif[i].tipo = 'eli';
                                break;
                            }
                        }
                        
                        fila.remove();
                    }
                    
                    e.stopPropagation();
                });*/
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
                
                /*self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    if (!self.$eNomAux.attr('disabled') || !self.$eCbxfibraAux.attr('disabled')) {
                    
                        var campObligPrep = false;
                        var campos = [self.$eNomPrep, self.$eCbxfibraPrep, self.$eTextArea];

                        campObligPrep = u.camposObligatorios(campos, '2');

                        var b = true;

                        if (um.cantidadDeQuimico({val: self.$eCantGrLtPrep.val(), input: 'grlt'})) {
                            b = false;
                        } else if (um.cantidadDeQuimico({val: self.$eCantPctjPrep.val(), input: 'pctj'})) {
                            b = false;
                        }

                        if (b && campObligPrep) {
                            consultas.consultarNombreMaestros(self.$eNomPrep.val() + " (" + self.$eCbxfibraPrep.val() + ")", 'editar', self.idProceso, 'ServletPreparaciones');
                        }
                    } else {
                        consultas.consultarNombreMaestros('', 'editar', self.idProceso, 'ServletPreparaciones');
                    }
                });*/
            },
            
            agregarProceso: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Proceso Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomProceso.val();
                    
                    um.guardarRegistro({form: 'proceso', tabla: self.$dataTableNewCurva, nombre: nombre}, 'ServletProcesos');
                    
                }
            },
            verProceso: function() {
                var self = this;

                /*self.$dataTableProceso.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idProceso = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomPrep, self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'ServletPreparaciones');
                    var datos = {
                        frm: 'prep',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oProcesos,
                        quimicos: self.oCurvas,
                        eNombre: self.$eNomPrep,
                        eNombreFib: self.$eCbxfibraPrep,
                        eTabla: self.$tBodyEditPrep,
                        eModal: self.$modalEditPrep
                    }
                    
                    $("#tableEditPrep tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomPrep);
                    elementos.push(self.$eCbxfibraPrep);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorPrep = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorPrep.length; i++) {
                        var q = {
                            codQ: self.quimicosPorPrep[i].codQ,
                            cantGrLt: self.quimicosPorPrep[i].cant1,
                            cantPctj: self.quimicosPorPrep[i].cant2,
                            cantGrLtNue: -1,
                            cantPctjNue: -1,
                            tipo: ''
                        };
                         self.eQuimicosModif.push(q);
                    }
                    
                    e.stopPropagation();
                });*/
                    
            },
            
            verificarSolicitudes: function() {
                var self = this;
                var elementos = [self.$eNomPrep, self.$eCbxfibraPrep];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            modificarCurvaProceso: function() {
                var self = this;
                
                /*self.$tBodyEditPrep.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    var r = um.verificarSolicitudes(fila[0].cells[0].textContent, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        self.$eCodQuimPrep.val(parseInt(fila[0].cells[0].textContent));
                        self.$eNomQuimPrep.val(fila[0].cells[1].textContent);
                        self.$eCantGrLtPrep.val(fila[0].cells[2].textContent);
                        self.$eCantPctjPrep.val(fila[0].cells[3].textContent);

                        var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                        um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oCurvas);
                        self.$eCodQuimPrep.attr('disabled', true);
                        self.$eNomQuimPrep.attr('disabled', true);

                        u.camposObligatorios(elementos, '2');
                    }
                                   
                    e.stopPropagation();
                });*/

            },
            
            solicitarModificarProceso: function(response) {
                var self = this;
                
                /*if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Preparación Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraPrep.val()) {
                            var idFibNue = self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        if (self.idProceso === self.oProcesos[i].idNomPreparacion) {
                            //nombre = self.oProcesos[i].nomPreparacion;
                            nombre = um.separarNombreDeFibra({nombre: self.oProcesos[i].nomPreparacion, fibra: self.oProcesos[i].idFibra.nomFibra});
                            idFib = self.oProcesos[i].idFibra.idFibra;
                            
                            if (nombre !== self.$eNomPrep.val()) {
                                nombreNue = self.$eNomPrep.val();
                            }
                            
                            if (idFib === idFibNue) {
                                idFibNue = '';
                            }
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$tableEditPrep, nombre: nombre, nombreNue: nombreNue, idFib: idFib, idFibNue: idFibNue, idMaestro: self.idProceso, coment: coment}, self.eQuimicosModif, self.eNuevosQuimicos, self.$modalEditPrep.find('#eBtnCerrar'), 'ServletPreparaciones');
                }*/
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                /*$(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditPrep.is(':hidden')) {
                        self.quimicosPorPrep = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
               self.$modalEditPrep.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditPrep.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorPrep = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });*/
            }
        };
    })();

    frmProceso.init();

})(document, window, jQuery)