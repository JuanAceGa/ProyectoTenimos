(function(document, window, $, undefined) {
    (function() {
        return pa = {
            UrlPreparacion: 'http://localhost:8084/ERPTenimosBackend/rest/preparacion/',
            UrlAuxiliar: '',
            UrlProPost: '',
            oQuimicos: {},
            oFibras: {},
            oPpreparacion: {},
            oPauxiliar: {},
            oPprocPost: {},
            oPformula: {},
            oPpreparacionEdit: {},
            oPauxiliarEdit: {},
            oPprocPostEdit: {},
            oPformulaEdit: {},
            $pendPreparacion: $('#pendPreparacion'),
            $pendAuxiliar: $('#pendAuxiliar'),
            $pendProcPost: $('#pendProcPost'),
            $pendFormula: $('#pendFormula'),
            $modalVerPendientes: $('#modalVerPendientes'),
            $tablaMaestroPend: $('#tablaMaestroPend'),
            $btnAprobar: $('#btnAprobar'),
            $btnRechazar: $('#btnRechazar'),
            $btnCerrarModal: $('#btnCerrarModal'),
            $editPreparacion: $('#editPreparacion'),
            $editAuxiliar: $('#editAuxiliar'),
            $editProcPost: $('#editProcPost'),
            $editFormula: $('#editFormula'),
            $modalEditarPendientes: $('#modalEditarPendientes'),
            $nomMaestroEditPend: $('#nomMaestroEditPend'),
            $cbxFibraEditPend: $('#cbxFibraEditPend'),
            $tableEditPend: $('#tableEditPend'),
            $codQuimPend: $('#codQuimPend'),
            $dlCodQuimPend: $('#dlCodQuimPend'),
            $nomQuimPend: $('#nomQuimPend'),
            $dlNomQuimPend: $('#dlNomQuimPend'),
            $cantGrLtPend: $('#cantGrLtPend'),
            $cantPctjPend: $('#cantPctjPend'),
            $btnAddQuimPend: $('#btnAddQuimPend'),
            $btnEditPend: $('#btnEditPend'),
            $btnCancelEditPend: $('#btnCancelEditPend'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalConfirmacion: $('#modalConfirmacion'),
            $modalAlertTitulo: $('#modalAlertTitulo'),
            $preguntaConfirmar: $('#preguntaConfirmar'),
            $btnSiAlerta: $('#btnSiAlerta'),
            $btnNoAlerta: $('#btnNoAlerta'),
            $fila: '',
            $tempTrMaestro: '<tr>' +
                                '<td>:nombre:</td>' +
                                '<td class="center">:fibra:</td>' +
                                '<td class="right">:costo:</td>' +
                                '<td class="center">' +
                                    ':boton:' +
                                '</td>' +
                            '</tr>',
            $tempTrQuimicos: '<tr>' +
                                '<td class="center">:codQuim:</td>' +
                                '<td class="center">:nomQuim:</td>' +
                                '<td class="right">:cantGr:</td>' +
                                '<td class="center">:cantPt:</td>' +
                            '</tr>',
            nombreMaestro: '',
            tPend: 0,
            tPendEdit: 0,
            banderaModal: 0,
            nombreMaestroEdit: '',
            quimicosPorMaestroPend: [],
            quimicosModifPend: [],
            quimicosNuevosPend: [],
            tipoEdicion: 'nuevo',
            filaEditar: null,
            idMaestro: 0,
            
            inicio: function() {
                this.verPendientes();
                this.aprobarPendiente();
                this.verPendienteAeditar();
                this.botonesDeEdicionMaestros();
                this.coincidenciaQuimico();
                this.formatoInput();
                this.metodosUtiles();
            },
            
            cargarDatos: function(oArr, tipo, estado) {
                var self = this;
                
                if (tipo === 'q') {
                    self.oQuimicos = oArr;
                    um.cargarDataList([self.$dlCodQuimPend, self.$dlNomQuimPend], self.oQuimicos, 'q');
                }
                
                if (tipo === 'f') {
                    self.oFibras = oArr;
                    um.cargarComboBox([self.$cbxFibraEditPend], self.oFibras, 'preparacion');
                }
                
                if (tipo === 'preparacion') {
                    if (estado === 'nuevo') {
                        self.oPpreparacion = oArr;
                    }
                    
                    if (estado === 'editar') {
                        self.oPpreparacionEdit = oArr;
                    }
                    self.renderTabla(1, estado);
                }
                
                if (tipo === 'auxiliar') {
                    self.oPauxiliar = oArr;
                    self.renderTabla(2);
                }
                
                if (tipo === 'procPost') {
                    self.oPprocPost = oArr;
                    self.renderTabla(3);
                }
                
                if (tipo === 'formula') {
                    self.oPformula = oArr;
                    self.renderTabla(4);
                }
            },
            
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimPend).on("keyup keypress change", function() {
                    self.$nomQuimPend.val("");
                    var elementos = [self.$codQuimPend, self.$nomQuimPend, self.$cantGrLtPend, self.$cantPctjPend];

                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$nomQuimPend).on('keyup keypress change', function() {
                    self.$codQuimPend.val("");
                    var elementos = [self.$nomQuimPend, self.$codQuimPend, self.$cantGrLtPend, self.$cantPctjPend];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });
            },
            
            formatoInput: function() {
                var self = this;

                self.$cantGrLtPend.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjPend.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });
            },
            
            metodosUtiles: function() {
                var self = this;
                
                self.$nomMaestroEditPend.focusin(function(e) {
                    self.$nomMaestroEditPend.css('text-transform', 'uppercase');
                });
                
                self.$nomMaestroEditPend.focusout(function(e) {
                    u.camposObligatorios([self.$nomMaestroEditPend], '4');
                    
                    (self.$nomMaestroEditPend.val() === '') ? self.$nomMaestroEditPend.css('text-transform', '') : '';
                });
                
                self.$cbxFibraEditPend.focusout(function (e) {
                    u.camposObligatorios([self.$cbxFibraEditPend], '4');
                });
                
                self.$codQuimPend.focusout(function (e) {
                    u.camposObligatorios([self.$codQuimPend, self.$nomQuimPend], '4');
                });
                
                self.$nomQuimPend.focusin(function(e) {
                    self.$nomQuimPend.css('text-transform', 'uppercase');
                });
                
                self.$nomQuimPend.focusout(function(e) {
                    u.camposObligatorios([self.$nomQuimPend, self.$codQuimPend], '4');
                    
                    (self.$nomQuimPend.val() === '') ? self.$nomQuimPend.css('text-transform', '') : '';
                });
                
                self.$cantGrLtPend.focusout(function (e) {
                    u.camposObligatorios([self.$cantGrLtPend, self.$cantPctjPend], '4');
                });
                
                self.$cantPctjPend.focusout(function (e) {
                    u.camposObligatorios([self.$cantGrLtPend, self.$cantPctjPend], '4');
                });
                
                self.$codQuimPend.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
            },
            
            renderTabla: function(t, estado) {
                var self = this;
                var tabla;
                var arr = [];
                var boton;
                
                if (t === 1 && estado === 'nuevo') {
                    tabla = self.$pendPreparacion;
                    arr = self.oPpreparacion;
                    boton = '<button id="btnVer" title="Ver" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                '<i class="glyphicon glyphicon-eye-open"></i>' +
                            '</button>';
                    
                } else if (t === 1 && estado === 'editar') {
                    tabla = self.$editPreparacion;
                    arr = self.oPpreparacionEdit;
                    
                    boton = '<button id="btnEdit" title="Editar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                '<i class="glyphicon glyphicon-edit"></i>' +
                            '</button>' +
                            '<button id="btnBorrar" title="Eliminar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                '<i class="fa fa-trash-o"></i>' +
                            '</button>';
                }

                if (t === 2) {

                }

                if (t === 3) {

                }

                if (t === 4) {

                }

                $(tabla).find('tbody').remove();
                $(tabla).append('<tbody></tbody>');

                for (var i = 0; i < arr.length; i++) {
                    var tempTrMaestro = self.$tempTrMaestro;

                    var tempTr = tempTrMaestro
                            .replace(':nombre:', arr[i].nombMaestro)
                            .replace(':fibra:', arr[i].codFibra)
                            .replace(':costo:', arr[i].costo.toFixed(2))
                            .replace(':boton:', boton);

                    $(tabla).find('tbody').append(tempTr);
                }

            },
            
            verPendientes: function() {
                var self = this;
                var tempTrEncabezado = '<tr>' +
                                           '<td class="col-md-1">Nombre:</td>' +
                                           '<td class="col-md-2">:nombMaestro:</td>' +
                                           '<td class="col-md-1">Fibra:</td>' +
                                           '<td class="col-md-2">:fibra:</td>' +
                                           '<td class="col-md-1">Costo:</td>' +
                                           '<td class="col-md-1">:costo:</td>' +
                                           '<td class="col-md-1">Solicitante:</td>' +
                                           '<td class="col-md-2">:nomUsuario:</td>' +
                                       '</tr>' +
                                       '<tr style="background: #E0E3E5;">' +
                                           '<td class="center" colspan="2"><strong>Código Químico</strong></td>' +
                                           '<td class="center" colspan="2"><strong>Nombre Químico</strong></td>' +
                                           '<td class="center" colspan="2"><strong>Cant. Gr/Lt</strong></td>' +
                                           '<td class="center" colspan="2"><strong>Cant. %/Kl</strong></td>' +
                                       '</tr>';
                
                var tempTrQuim = '<tr>' +
                                    '<td class="center" colspan="2">:codQuim:</td>' +
                                    '<td class="center" colspan="2">:nomProd:</td>' +
                                    '<td class="center" colspan="2">:gr:</td>' +
                                    '<td class="center" colspan="2">:ptj:</td>' +
                                '</tr>';                
                
                self.$pendPreparacion.on('click', '#btnVer', function(e) {
                    self.$fila = $(this).closest('tr');
                    self.tPend = 1;
                    self.nombreMaestro = self.$fila[0].cells[0].textContent;
                    
                    self.renderModal(self.oPpreparacion, tempTrEncabezado, tempTrQuim);
                    
                    e.stopPropagation();
                });
                
                self.$pendAuxiliar.on('click', '#btnVer', function(e) {
                    self.$fila = $(this).closest('tr');
                    self.tPend = 2;
                    self.nombreMaestro = self.$fila[0].cells[0].textContent;
                    
                    self.renderModal(self.oPauxiliar, tempTrEncabezado, tempTrQuim);
                    
                    e.stopPropagation();
                });
                
                self.$pendProcPost.on('click', '#btnVer', function(e) {
                    self.$fila = $(this).closest('tr');
                    self.tPend = 3;
                    self.nombreMaestro = self.$fila[0].cells[0].textContent;
                    
                    self.renderModal(self.oPprocPost, tempTrEncabezado, tempTrQuim);
                    
                    e.stopPropagation();
                });
                
                self.$pendFormula.on('click', '#btnVer', function(e) {
                    self.$fila = $(this).closest('tr');
                    self.tPend = 4;
                    self.nombreMaestro = self.$fila[0].cells[0].textContent;
                    
                    self.renderModal(self.oPformula, tempTrEncabezado, tempTrQuim);
                    
                    e.stopPropagation();
                });
            },
            
            renderModal: function(oPend, trEncabezado, trQuim) {
                var self = this;
                
                self.$tablaMaestroPend.find('tbody').remove();
                self.$tablaMaestroPend.append('<tbody></tbody>');
                
                for (var i = 0; i < oPend.length; i++) {
                    if (oPend[i].nombMaestro === self.nombreMaestro) {
                        var tempTrEncabezado = trEncabezado.replace(':nombMaestro:', oPend[i].nombMaestro)
                                                           .replace(':fibra:', oPend[i].codFibra + ' - ' + oPend[i].nomFibra)
                                                           .replace(':costo:', '$ ' + oPend[i].costo.toFixed(2))
                                                           .replace(':nomUsuario:', oPend[i].nomUsuario + ' ' + oPend[i].apeUsuario);
                                
                        self.$tablaMaestroPend.find('tbody').append(tempTrEncabezado);
                        
                        var quimicos = oPend[i].quimicos;
                        
                        for (var j = 0; j < quimicos.length; j++) {
                            
                            for (var k = 0; k < self.oQuimicos.length; k++) {
                                if (self.oQuimicos[k].codProduct === quimicos[j].codQuimico) {
                                    var tempTrQuim = trQuim.replace(':codQuim:', quimicos[j].codQuimico)
                                                           .replace(':nomProd:', self.oQuimicos[k].nomProducto)
                                                           .replace(':gr:', (quimicos[j].cantGr === null) ? '' : quimicos[j].cantGr)
                                                           .replace(':ptj:', (quimicos[j].cantPtj === null) ? '' : quimicos[j].cantPtj);                                    
                                    
                                    self.$tablaMaestroPend.find('tbody').append(tempTrQuim);
                                    break;
                                }
                            }
                        }
                        self.$modalVerPendientes.modal('show', 'slow');
                        break;
                    }
                }
            },
            
            aprobarPendiente: function() {
                var self = this;
                
                self.$btnAprobar.on('click', function(e) {
                    e.preventDefault();
                    var oArr;
                    
                    if (self.tPend === 1) {
                        oArr = self.oPpreparacion;
                        
                    } else if (self.tPend === 2) {
                        oArr = self.oPauxiliar;
                        
                    } else if (self.tPend === 3) {
                        oArr = self.oPprocPost;
                        
                    } else if (self.tPend === 4) {
                        oArr = self.oPformula;
                    }
                    
                    for (var i = 0; i < oArr.length; i++) {
                        if (oArr[i].nombMaestro === self.nombreMaestro) {
                            
                            consultas.guardarNuevoMaestro(oArr[i], 'preparacion', self.$btnCerrarModal, self.$fila);
                            break;
                        }
                    }
                });
            },
            
            verPendienteAeditar: function() {
                var self = this;
                var fila;
                
                self.$editPreparacion.on('click', '#btnEdit, #btnBorrar', function (e) {
                    fila = $(this).closest('tr');
                    self.nombreMaestroEdit = fila[0].cells[0].textContent;
                    
                    if ($(this).is('#btnEdit')) {
                        self.quimicosPorMaestroPend = [];
                        self.quimicosModifPend = [];
                        self.quimicosNuevosPend = [];

                        self.banderaModal = 1;
                        self.tPendEdit = 1;
                        
                        self.renderPendieteAeditar(self.oPpreparacionEdit);
                        
                    } else if ($(this).is('#btnBorrar')) {
                        self.tPendEdit = 1;
                        self.mensajeModal({
                            tipo: 'alerta',
                            titulo: 'Eliminar Maestro Pendiente de Preparación',
                            cuerpoMensaje: 'Esta seguro que desea eliminar el maestro ' + self.nombreMaestroEdit,
                            fila: fila
                        });
                    }
                    
                    e.stopPropagation();
                });
                
                self.$editAuxiliar.on('click', '#btnEdit', function (e) {
                    self.quimicosPorMaestroPend = [];
                    self.quimicosModifPend = [];
                    self.quimicosNuevosPend = [];
                    
                    self.banderaModal = 1;
                    self.tPendEdit = 2;
                    fila = $(this).closest('tr');
                    self.nombreMaestroEdit = fila[0].cells[0].textContent;
                    
                    self.renderPendieteAeditar(self.oPauxiliarEdit);
                    
                    e.stopPropagation();
                });
                
                self.$editProcPost.on('click', '#btnEdit', function (e) {
                    self.quimicosPorMaestroPend = [];
                    self.quimicosModifPend = [];
                    self.quimicosNuevosPend = [];
                    
                    self.banderaModal = 1;
                    self.tPendEdit = 3;
                    fila = $(this).closest('tr');
                    self.nombreMaestroEdit = fila[0].cells[0].textContent;
                    
                    self.renderPendieteAeditar(self.oPprocPostEdit);
                    
                    e.stopPropagation();
                });
                
                self.$btnSiAlerta.on('click', function(e) {
                    
                    if (self.tPendEdit === 1) {
                        self.eliminarMaestroPendiente(self.oPpreparacionEdit, self.UrlPreparacion, fila);
                        
                    } else if (self.tPendEdit === 2) {
                        self.eliminarMaestroPendiente(self.oPauxiliarEdit, self.UrlAuxiliar, fila);
                        
                    } else if (self.tPendEdit === 3) {
                        self.eliminarMaestroPendiente(self.oPpreparacionEdit, self.UrlProPost, fila);
                        
                    }
                    
                    self.$btnNoAlerta.click();
                    
                    e.stopPropagation();
                });
            },
            
            eliminarMaestroPendiente: function(oArr, url, fila) {
                var self = this;
                
                for (var i = 0; i < oArr.length; i++) {
                    if (oArr[i].nombMaestro === self.nombreMaestroEdit) {
                        var idMaestro = oArr[i].idMaestro;                        
                        break;
                    }
                }
                
                $.get(url + 'rechazarPendiente', {
                    idMaestro: idMaestro
                },
                function(res) {
                    
                    if (res) {
                        self.mensajeGritter({
                            titulo: 'Eliminar Maestro',
                            mensaje: '¡El maestro ha sido eliminado.!',
                            clase: ''
                        });

                        consultas.consultarPendientesParaEditar();
                        fila.remove();

                    } else {
                        self.mensajeGritter({
                            titulo: 'Eliminar Maestro',
                            mensaje: '¡El maestro no ha sido eliminado.!',
                            clase: 'growl-warning'
                        });
                        consultas.consultarPendientesParaEditar();
                    }
                });
                
            },
                    
            renderPendieteAeditar: function(oArr) {
                var self = this;
                var trTemplate = '<tr>' +
                                    '<td style="text-align: center">:codQuim:</td>' +
                                    '<td>:nomQuim:</td>' +
                                    '<td style="text-align: center">:cantGrLt:</td>' +
                                    '<td style="text-align: center">:cantPctj:</td>' +
                                    '<td>' +
                                        '<div class="form-group col-md-12">' +
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                    '<td>' +
                                        '<div class="form-group col-md-12">' +
                                            '<button type="button" class="btn" id="btnEditQuimPend">' +
                                                '<span class="glyphicon glyphicon-edit"></span>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                        
                var elementos = [self.$nomMaestroEditPend, self.$codQuimPend, self.$nomQuimPend, self.$cantGrLtPend, self.$cantPctjPend];

                self.$tableEditPend.find('tbody tr:gt(0)').remove();
                u.limpiarCampos(elementos);
                elementos.push(self.$cbxFibraEditPend);
                u.habilitarDeshabilitarCampos(elementos, 'hab');

                for (var i = 0; i < oArr.length; i++) {
                    if (oArr[i].nombMaestro === self.nombreMaestroEdit) {
                        self.$nomMaestroEditPend.val(um.separarNombreDeFibra({nombre: oArr[i].nombMaestro, fibra: oArr[i].nomFibra}));
                        self.$cbxFibraEditPend.val(oArr[i].nomFibra);
                        self.idMaestro = oArr[i].idMaestro;
                        
                        var quimicos = oArr[i].quimicos;

                        for (var j = 0; j < quimicos.length; j++) {
                            for (var k = 0; k < self.oQuimicos.length; k++) {
                                if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                    var trTemp = trTemplate;

                                    var tr = trTemp.replace(':codQuim:', quimicos[j].codQuimico)
                                            .replace(':cantGrLt:', (quimicos[j].cantGr !== null) ? quimicos[j].cantGr : '')
                                            .replace(':cantPctj:', (quimicos[j].cantPtj !== null) ? quimicos[j].cantPtj : '')
                                            .replace(':nomQuim:', self.oQuimicos[k].nomProducto);

                                    self.$tableEditPend.find('tbody').append(tr);

                                    self.quimicosPorMaestroPend.push({
                                        codQuimico: quimicos[j].codQuimico,
                                        cantGr: parseFloat(quimicos[j].cantGr),
                                        cantPtj: parseFloat(quimicos[j].cantPtj)
                                    });

                                    self.quimicosModifPend.push({
                                        codQ: quimicos[j].codQuimico,
                                        cantGrLt: parseFloat(quimicos[j].cantGr),
                                        cantPctj: parseFloat(quimicos[j].cantPtj),
                                        cantGrLtNue: -1,
                                        cantPctjNue: -1,
                                        tipo: ''
                                    });
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                self.$modalEditarPendientes.modal('show', 'slow');
                
                u.camposObligatorios(elementos, '4');                
            }, 
            
            botonesDeEdicionMaestros: function(){
                var self = this;
                
                self.$modalEditarPendientes.on('click', '#btnDelLinea', function(e) {
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;

                    var posN = ((rowIndex - 2) - (self.quimicosPorMaestroPend.length - self.quimicosNuevosPend.length));

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'prep',
                        codQpermitido: '',
                        pos: (rowIndex - 2)},
                        self.quimicosPorMaestroPend);

                    self.quimicosPorMaestroPend = d.oQuim;

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'prep',
                        codQpermitido: '',
                        pos: posN},
                        self.quimicosNuevosPend);

                    self.quimicosNuevosPend = d.oQuim;

                    for (var i = 0; i < self.quimicosModifPend.length; i++) {
                        if (self.quimicosModifPend[i].codQ === fila[0].cells[0].textContent) {
                            self.quimicosModifPend[i].tipo = 'eli';
                            break;
                        }
                    }

                    fila.remove();

                    e.stopPropagation();
                });
                
                self.$modalEditarPendientes.on('click', '#btnEditQuimPend', function(e){
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    
                    self.$codQuimPend.val(parseInt(fila[0].cells[0].textContent));
                    self.$nomQuimPend.val(fila[0].cells[1].textContent);
                    self.$cantGrLtPend.val(fila[0].cells[2].textContent);
                    self.$cantPctjPend.val(fila[0].cells[3].textContent);
                    
                    var elementos = [self.$codQuimPend, self.$nomQuimPend, self.$cantGrLtPend, self.$cantPctjPend];
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    self.$codQuimPend.attr('disabled', true);
                    self.$nomQuimPend.attr('disabled', true);

                    u.camposObligatorios(elementos, '4');
                    
                    e.stopPropagation();
                });
                
                self.$btnAddQuimPend.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$codQuimPend, self.$nomQuimPend, self.$cantGrLtPend, self.$cantPctjPend];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$cantGrLtPend.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModal({
                            tipo: 'obligatorio',
                            titulo: 'Unidad de Medida Gramos por Litro', 
                            cuerpoMensaje: 'Los gramos debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPend.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeModal({
                            tipo: 'obligatorio',
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'
                        });
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$codQuimPend.val(),
                            nomQuim: self.$nomQuimPend.val(),
                            cantGrLt: self.$cantGrLtPend.val(),
                            cantPctj: self.$cantPctjPend.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$modalEditarPendientes.find('tbody');
                            
                            if(parseFloat(self.$cantGrLtPend.val()) > 0) {
                                var gr = parseFloat(self.$cantGrLtPend.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$cantPctjPend.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQuimico: self.$codQuimPend.val(),
                                    cantGr: gr,
                                    cantPtj: pctj,
                                    maestro: 'prep', 
                                    codQpermitido: ''},
                                    self.quimicosPorMaestroPend);
                                    
                            if (!d.existe) {
                                self.quimicosPorMaestroPend.push({codQuimico: self.$codQuimPend.val(), cantGr: gr, cantPtj: pctj});
                                self.quimicosNuevosPend.push({codQ: self.$codQuimPend.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$codQuimPend.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: (parseFloat(self.$cantGrLtPend.val()) > 0) ? self.$cantGrLtPend.val() : 0,
                                cantPctjNue: (parseFloat(self.$cantPctjPend.val()) > 0) ? self.$cantPctjPend.val() : 0,
                                tipo: 'mod'
                            };
                            self.quimicosModifPend = um.modificarRegistro(q, self.quimicosModifPend);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$codQuimPend, self.$nomQuimPend, self.$cantGrLtPend, self.$cantPctjPend])
                            self.$codQuimPend.attr('disabled', false);
                            self.$nomQuimPend.attr('disabled', false);
                            self.filaEditar = null;
                            self.tipoEdicion = 'nuevo'
                            
                       } else {
                            self.mensajeModal({
                                tipo: 'obligatorio',
                                titulo: 'Registro de Químicos',
                                cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'
                            });
                        }
                    }
                });
                
                self.$btnEditPend.on('click', function(e) {
                    e.preventDefault();
                    var url;
                    var arrPend;
                    var campObligPrep = false;
                    var campos = [self.$nomMaestroEditPend, self.$cbxFibraEditPend];

                    campObligPrep = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPend.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPend.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligPrep) {
                        var nombre = self.$nomMaestroEditPend.val().trim();
                        var fibra = self.$cbxFibraEditPend.val();

                        if (self.tPendEdit === 1) {
                            arrPend = self.oPpreparacionEdit;
                            url = self.UrlPreparacion;
                            
                        } else if (self.tPendEdit === 2) {
                            arrPend = self.oPauxiliarEdit;
                            url = self.UrlAuxiliar;
                            
                        } else if (self.tPendEdit === 3) {
                            arrPend = self.oPprocPostEdit;
                            url = self.UrlProPost;
                        }

                        for (var i = 0; i < arrPend.length; i++) {
                            if (self.idMaestro === arrPend[i].idMaestro) {
                                var nombreOrg = um.separarNombreDeFibra({nombre: arrPend[i].nombMaestro, fibra: arrPend[i].nomFibra});
                                
                                $.get(url + 'buscarNombre', {
                                    tipo: 'editar',
                                    idMaestro: self.idMaestro,
                                    nombre: (nombre.toUpperCase() !== nombreOrg || fibra !== arrPend[i].nomFibra) ? nombre.toUpperCase() + ' (' + fibra + ')' : arrPend[i].nombMaestro
                                },
                                function(res) {
                                    if (nombre.toUpperCase() !== nombreOrg || fibra !== arrPend[i].nomFibra) {
                                        var n = nombre.toUpperCase() + ' (' + fibra + ')';
                                    } else {
                                        var n = arrPend[i].nombMaestro;
                                    }
                                    
                                    self.modificarMaestroPendiente(res, arrPend, url, n, fibra);
                                });

                                break;
                            }
                        }
                    }
                });
            },
            
            modificarMaestroPendiente: function(res, arrPend, url, nombre, fibra) {
                var self = this;

                if (res) {
                    self.mensajeModal({
                        tipo: 'obligatorio',
                        titulo: 'Nombre de Maestro Existente.',
                        cuerpoMensaje: 'Ya hay un maestro con ese nombre, por favor intente nuevamente.'
                    });

                } else if (!res) {

                    for (var i = 0; i < arrPend.length; i++) {
                        if (arrPend[i].idMaestro === self.idMaestro) {
                            var datos = new Object();

                            datos.idMaestro = arrPend[i].idMaestro;
                            datos.nombMaestro = nombre;
                            datos.fechaUso = null;

                            for (var j = 0; j < self.oFibras.length; j++) {
                                if (fibra === self.oFibras[j].nomFibra) {
                                    datos.idFibra = self.oFibras[j].idFibra;
                                    datos.codFibra = self.oFibras[j].codFibra;
                                    datos.nomFibra = fibra;
                                    datos.composFibra = self.oFibras[j].composicion;
                                    break;
                                }
                            }

                            datos.costo = null;
                            datos.quimicos = new Array();

                            for (var j = 0; j < self.quimicosModifPend.length; j++) {
                                var qModif = self.quimicosModifPend[j];
                                
                                if (qModif.tipo === 'mod' || qModif.tipo === '') {
                                    for (var k = 0; k < self.quimicosPorMaestroPend.length; k++) {
                                        var qOrg = self.quimicosPorMaestroPend[k];

                                        if (qModif.tipo === 'mod' && qOrg.codQuimico === qModif.codQ) {
                                            datos.quimicos.push({
                                                codQuimico: qOrg.codQuimico, 
                                                cantGr: (!isNaN(qModif.cantGrLtNue)) ? qModif.cantGrLtNue : 0, 
                                                cantPtj: (!isNaN(qModif.cantPctjNue)) ? qModif.cantPctjNue : 0, 
                                                seccion: 0
                                            });
                                            break;
                                        } else if (qModif.tipo === '' && qOrg.codQuimico === qModif.codQ) {
                                            datos.quimicos.push({
                                                codQuimico: qOrg.codQuimico, 
                                                cantGr: (!isNaN(qOrg.cantGr )) ? qOrg.cantGr : 0, 
                                                cantPtj: (!isNaN(qOrg.cantPtj )) ? qOrg.cantPtj : 0, 
                                                seccion: 0
                                            });
                                            break;
                                        }
                                    }
                                } else if (qModif.tipo === 'eli') {
                                    datos.quimicos.push({codQuimico: qModif.codQ, cantGr: qModif.cantGrLt, cantPtj: qModif.cantPctj, seccion: 1});
                                } 
                            }

                            for (var j = 0; j < self.quimicosNuevosPend.length; j++) {
                                var qNuev = self.quimicosNuevosPend[j];
                                datos.quimicos.push({codQuimico: qNuev.codQ, cantGr: qNuev.cant1, cantPtj: qNuev.cant2, seccion: 2});
                            }
                            
                            break;
                        }
                    }
                    
                    $.ajax({
                        url: url + 'editarPendiente',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            datos: JSON.stringify(datos)
                        },
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        success: function(res) {
                            if (res) {
                                self.mensajeGritter({
                                    titulo: 'Modificar Registro',
                                    mensaje: '¡El maestro ha sido modificado.!',
                                    clase: ''
                                });

                                consultas.consultarPendientesParaEditar();
                                self.$btnCancelEditPend.click();
                                //self.$modalVerPendientes.modal('hide', 'slow');

                            } else {
                                self.mensajeGritter({
                                    titulo: 'Modificar Registro',
                                    mensaje: '¡El maestro no ha sido modificado.!',
                                    clase: 'growl-warning'
                                });
                            }
                        },
                        error: function() {
                            self.mensajeGritter({
                                titulo: 'Problema con la Aplicación',
                                mensaje: '¡Ah ocurrido un problema, favor intenta otra vez!',
                                clase: 'growl-danger'
                            });
                        }
                    });
                }
            },
            
            mensajeModal: function(m) {
                var self = this;

                try {
                    if (m.tipo === 'obligatorio') {
                        self.$tituloMensaje.text(m.titulo);
                        self.$cuerpoMensaje.text(m.cuerpoMensaje);
                        self.$modalMensaje.modal("show");
                    }

                    if (m.tipo === 'alerta') {
                        self.$modalAlertTitulo.text(m.titulo);
                        self.$preguntaConfirmar.text(m.cuerpoMensaje);
                        self.$modalConfirmacion.modal('show');
                    }
                    
                } catch (e) {
                    if (m.tipo === 'obligatorio') {
                        alert(m.cuerpoMensaje);
                    }
                    
                    if (m.tipo === 'alerta') {
                        var confirmar = confirm(m.cuerpoMensaje);
                        
                        if (confirmar) {
                            if (self.tPendEdit === 1) {
                                self.eliminarMaestroPendiente(self.oPpreparacionEdit, self.UrlPreparacion, m.fila);

                            } else if (self.tPendEdit === 2) {
                                self.eliminarMaestroPendiente(self.oPauxiliarEdit, self.UrlAuxiliar, m.fila);

                            } else if (self.tPendEdit === 3) {
                                self.eliminarMaestroPendiente(self.oPpreparacionEdit, self.UrlProPost, m.fila);

                            }
                        }
                    }
                    
                }
            }, 
            
            mensajeGritter: function(m) {
                
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
        };
    })();
    
    pa.inicio();
    
})(document, window, jQuery)