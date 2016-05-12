(function(document, window, $, undefined) {
    (function() {
        return frmPreparacion = {
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            UrlProdQuimicos: 'http://localhost:8084/ERPTenimosBackend/rest/productformulacion/',
            UrlPreparacion: 'http://localhost:8084/ERPTenimosBackend/rest/preparacion/',
            oFibras: {},
            oQuimicos: {},
            oPreparaciones: {},
            $frmPreparacion: $('#frmPreparacion'),
            $dataTableNewQPreparacion: $('#dataTableNewQPreparacion'),
            $tBodyNewQPreparacion: $('#tBodyNewQPreparacion'),
            $dataTablePreparacion: $('#dataTablePreparacion'),
            $btnNewPrep: $('#btnNewPrep'),
            $nomPrep: $('#nomPrep'),
            $cbxfibraPrep: $('#cbxfibraPrep'),
            $codQuimPrep: $('#codQuimPrep'),
            $nomQuimPrep: $('#nomQuimPrep'),
            $dlCodQuimPrep: $('#dlCodQuimPrep'),
            $dlNomQuimPrep: $('#dlNomQuimPrep'),
            $cantGrLtPrep: $('#cantGrLtPrep'),
            $cantPctjPrep: $('#cantPctjPrep'),
            $btnAddLineaPrep: $('#btnAddLineaPrep'),
            $btnSavePrep: $('#btnSavePrep'),
            $btnCleanPrep: $('#btnCleanPrep'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditPrep: $('#modalEditPreparacion'),
            $tableEditPrep: $('#tableEditPrep'),
            $tBodyEditPrep: $('#tableEditPrep').find('tbody'),
            $eCbxfibraPrep: $('#eCbxfibraPrep'),
            $eCodQuimPrep: $('#eCodQuimPrep'),
            $eNomQuimPrep: $('#eNomQuimPrep'),
            $eNomPrep: $('#eNomPrep'),
            $eDlCodQuimPrep: $('#eDlCodQuimPrep'),
            $eDlNomQuimPrep: $('#eDlNomQuimPrep'),
            $eCantGrLtPrep: $('#eCantGrLtPrep'),
            $eCantPctjPrep: $('#eCantPctjPrep'),
            $eTextArea: $('#modalEditPreparacion').find('textarea'),
            $eBtnAddLineaPrep: $('#eBtnAddLineaPrep'),
            $eBtnModificar: $('#eBtnEditPrep'),
            $eBtnRestPrep: $('#eBtnRestPrep'),
            $eBtnCerrar: $('#eBtnCerrarModalEditPrep'),
            $eBtnCerrar2: $('#modalEditPreparacion').find('.modal-header .close'),
            quimicosPorPrep: [],
            idPreparacion: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            eNuevosQuimicos: [],
            eQuimicosModif: [],
            solicitudesEnviadas: [],
            solcNombre: false,
            solcFibra: false,
            
            init: function() {
                this.inhabilitarCampos();
                this.coincidenciaQuimico();
                this.formatoInput();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.agregarLineaPreparacion();
                this.borrarLineaPreparacion();
                this.consultarNombres();
                this.verPreparacion();
                this.modificarQuimicoPreparacion();
                this.cerrarModalEdicion();
            },
            
            consultas: function() {
                var self = this;
                
                $.get(self.UrlFibras + 'listadoFibras', function(data) {
                    self.cargarDatos(data, 'f');
                });

                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    self.cargarDatos(data, 'q');
                });

                $.get(self.UrlPreparacion + 'maestros', function(data) {
                    self.cargarDatos(data, 'pr');
                });
            },
            
            cargarDatos: function(dato, opc) {
                var self = this;
                var elementos = [];
                
                if (opc === 'f') {
                    self.oFibras = dato;
                    
                    elementos.push(self.$cbxfibraPrep);
                    elementos.push(self.$eCbxfibraPrep);
                    um.cargarComboBox(elementos, self.oFibras, 'preparacion');
                }

                if (opc === 'q') {
                    self.oQuimicos = dato;
                    elementos.push(self.$dlCodQuimPrep);
                    elementos.push(self.$dlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimPrep);
                    elementos.push(self.$eDlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                }

                if (opc === 'pr') {
                    
                    self.oPreparaciones = "";
                    self.oPreparaciones = u.cantidadDecimales(dato, 1, '');
                    um.destruirDataTable(self.$dataTablePreparacion.dataTable(), '1');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones, 'prep');
                    self.pintarCamposObligatorios();
                }

                /*if (opc === 'npr') {
                    if (dato !== null) {
                        self.oPreparaciones = "";
                        self.oPreparaciones = u.cantidadDecimales(dato, 1, '');
                        um.destruirDataTable(self.$dataTablePreparacion.dataTable(), '1');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones, 'prep');
                        self.pintarCamposObligatorios();
                    }
                }
                
                if (opc === 'solic') {
                    if (!$.isEmptyObject(dato)) {
                        self.solicitudesEnviadas = dato;
                        self.solcNombre = false;
                        self.solcFibra = false;
                        self.verificarSolicitudes();
                    }
                }*/
            },
            
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSavePrep.attr('disabled', true);
            },
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimPrep).on("keyup keypress change", function() {
                    self.$nomQuimPrep.val("");
                    var elementos = [self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];

                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$nomQuimPrep).on('keyup keypress change', function() {
                    self.$codQuimPrep.val("");
                    var elementos = [self.$nomQuimPrep, self.$codQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });

                $(self.$eCodQuimPrep).on('keyup keypress change', function() {
                    self.$eNomQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                    
                });

                $(self.$eNomQuimPrep).on('keyup keypress change', function() {
                    self.$eCodQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimPrep, self.$eCodQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });
            },
            metodosUtiles: function() {
                var self = this;
                
                self.$nomPrep.focusin(function(e) {
                    self.$nomPrep.css('text-transform', 'uppercase');
                });
                
                self.$nomPrep.focusout(function(e) {
                    u.camposObligatorios([self.$nomPrep], '4');
                    
                    (self.$nomPrep.val() === '') ? self.$nomPrep.css('text-transform', '') : '';
                });
                
                self.$cbxfibraPrep.focusout(function (e) {
                    u.camposObligatorios([self.$cbxfibraPrep], '4');
                });
                
                self.$codQuimPrep.focusout(function (e) {
                    u.camposObligatorios([self.$codQuimPrep, self.$nomQuimPrep], '4');
                });
                
                self.$nomQuimPrep.focusin(function(e) {
                    self.$nomQuimPrep.css('text-transform', 'uppercase');
                });
                
                self.$nomQuimPrep.focusout(function(e) {
                    u.camposObligatorios([self.$nomQuimPrep, self.$codQuimPrep], '4');
                    
                    (self.$nomQuimPrep.val() === '') ? self.$nomQuimPrep.css('text-transform', '') : '';
                });
                
                self.$cantGrLtPrep.focusout(function (e) {
                    u.camposObligatorios([self.$cantGrLtPrep, self.$cantPctjPrep], '4');
                });
                
                self.$cantPctjPrep.focusout(function (e) {
                    u.camposObligatorios([self.$cantGrLtPrep, self.$cantPctjPrep], '4');
                });
                
                self.$eNomPrep.focusin(function(e) {
                    self.$eNomPrep.css('text-transform', 'uppercase');
                });
                
                self.$eNomPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eNomPrep], '4');
                    
                    (self.$eNomPrep.val() === '') ? self.$eNomPrep.css('text-transform', '') : '';
                });
                
                self.$eCbxfibraPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eCbxfibraPrep], '4');
                });
                
                self.$eCodQuimPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eCodQuimPrep, self.$eNomQuimPrep], '4');
                });
                
                self.$eNomQuimPrep.focusin(function(e) {
                    self.$eNomQuimPrep.css('text-transform', 'uppercase');
                });
                
                self.$eNomQuimPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eNomQuimPrep, self.$eCodQuimPrep], '4');
                    
                    (self.$eNomQuimPrep.val() === '') ? self.$eNomQuimPrep.css('text-transform', '') : '';
                });
                
                self.$eCantGrLtPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eCantGrLtPrep, self.$eCantPctjPrep], '4');
                });
                
                self.$eCantPctjPrep.focusout(function(e) {
                    u.camposObligatorios([self.$eCantGrLtPrep, self.$eCantPctjPrep], '4');
                });
                
                self.$codQuimPrep.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eTextArea.focusout(function(e) {
                    u.camposObligatorios([self.$eTextArea], '4');
                });

                self.$eCodQuimPrep.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanPrep.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestPrep.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaPrep);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraPrep.val("Seleccione una...");
                var elementos = [self.$nomPrep, self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
                u.limpiarCampos(elementos);

                $('#dataTableNewQPreparacion tr:gt(1)').remove();
                self.quimicosPorPrep = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomPrep, self.$cbxfibraPrep, self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
              
              u.camposObligatorios(campos, '1');
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
            
            agregarLineaPreparacion: function() {
                var self = this;
                
                self.$btnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro',
                            mensaje: 'La cantidad debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            mensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'
                        });
                    }

                    if (b && campObligQuim) {
                        
                        var d = um.noRepetirQuimicos({
                            tipo: '+', 
                            codQuimico: self.$codQuimPrep.val(),
                            cantGr: parseFloat(self.$cantGrLtPrep.val()),
                            cantPtj: parseFloat(self.$cantPctjPrep.val()),
                            maestro: 'prep', 
                            codQpermitido: '1550'},
                            self.quimicosPorPrep);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorPrep.push({codQuimico: self.$codQuimPrep.val(), cantGr: parseFloat(self.$cantGrLtPrep.val()), cantPtj: parseFloat(self.$cantPctjPrep.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQPreparacion,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimPrep.val(),
                                    nomQuim: self.$nomQuimPrep.val(),
                                    cantGrLt: self.$cantGrLtPrep.val(),
                                    cantPctj: self.$cantPctjPrep.val()});
                            
                            u.limpiarCampos(elementos);
                            u.camposObligatorios(elementos, '4');

                            self.$btnSavePrep.attr('disabled', false);
                        } else {
                            self.mensajeModalAndGritter({
                                tipo: 'modal',
                                titulo: 'Registro de Químicos',
                                mensaje: 'No puede agregar más de una vez un mismo químico.'
                            });
                        }
                    }
                });
                
                self.$eBtnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro',
                            mensaje: 'Los gramos debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'
                        });
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
                                    codQuimico: self.$eCodQuimPrep.val(),
                                    cantGr: gr,
                                    cantPtj: pctj,
                                    maestro: 'prep', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorPrep);
                            if (!d.existe) {
                                self.quimicosPorPrep.push({codQuimico: self.$eCodQuimPrep.val(), cantGr: gr, cantPtj: pctj});
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
                            self.mensajeModalAndGritter({
                                tipo: 'modal',
                                titulo: 'Registro de Químicos',
                                mensaje: 'No puede agregar más de una vez un mismo químico.'
                            });
                        }
                    }
                });
            },
            borrarLineaPreparacion: function() {
                var self = this;
                
                self.$dataTableNewQPreparacion.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: '',
                        cant2: '',
                        maestro: 'prep', 
                        codQpermitido: '',
                        pos: (rowIndex - 2)}, 
                        self.quimicosPorPrep);
                    
                    self.quimicosPorPrep = d.oQuim;
                    
                    fila.remove();
                    
                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 === 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditPrep.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;
                    
                    var posN = ((rowIndex - 2) - (self.quimicosPorPrep.length - self.eNuevosQuimicos.length));

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'prep',
                        codQpermitido: '',
                        pos: (rowIndex - 2)},
                        self.quimicosPorPrep);

                    self.quimicosPorPrep = d.oQuim;

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'prep',
                        codQpermitido: '', 
                        pos: posN},
                    self.eNuevosQuimicos);

                    self.eNuevosQuimicos = d.oQuim;

                    for (var i = 0; i < self.eQuimicosModif.length; i++) {
                        if (self.eQuimicosModif[i].codQ === codigo) {
                            self.eQuimicosModif[i].tipo = 'eli';
                            break;
                        }
                    }

                    fila.remove();
                    
                    e.stopPropagation();
                });
            },
            
            consultarNombres: function(){
                var self = this;

                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = false;
                    var campos = [self.$nomPrep, self.$cbxfibraPrep];

                    campObligPrep = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligPrep) {
                        var n = self.$nomPrep.val().trim();
                        
                        self.consultarNombresPreparaciones('nuevo', 0, n.toUpperCase() + ' (' + self.$cbxfibraPrep.val() + ')');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    if (!self.$eNomPrep.attr('disabled') && !self.$eCbxfibraPrep.attr('disabled')) {
                    
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
                            var n = self.$eNomPrep.val().trim();
                            var nombre = n.toUpperCase();
                            var fibra = self.$eCbxfibraPrep.val();
                            
                            for (var i = 0; i < self.oPreparaciones.length; i++) {
                                if (self.idPreparacion === self.oPreparaciones[i].idMaestro) {
                                    var nombreOrg = um.separarNombreDeFibra({nombre: self.oPreparaciones[i].nombMaestro, fibra: self.oPreparaciones[i].nomFibra});
                                    
                                    self.consultarNombresPreparaciones('editar', self.idPreparacion, (nombre !== nombreOrg || fibra !== self.oPreparaciones[i].nomFibra) ? nombre + ' (' + fibra + ')' : '');
                                    
                                    break;
                                }
                            }
                        }
                    } else {                        
                        var n = self.$eNomPrep.val().trim();
                        
                        for (var i = 0; i < self.solicitudesEnviadas.length; i++) {                            
                            var nombre = (self.solicitudesEnviadas[i].nombreNue !== null) ? self.solicitudesEnviadas[i].nombreNue : n.toUpperCase();

                            if (self.solicitudesEnviadas[i].idFibraNue !== null) {
                                for (var j = 0; j < self.oFibras.length; j++) {
                                    var fibra = (self.solicitudesEnviadas[i].idFibraNue === self.oFibras[i].idFibra) ? self.oFibras[i].nomFibra : self.$eCbxfibraPrep.val();
                                    break;
                                }
                            }
                        }
                        self.consultarNombresPreparaciones('editar', self.idPreparacion, nombre + ' (' + fibra + ')');
                    }
                });
            },
            
            consultarNombresPreparaciones: function(t, i, n) {
                var self = this;
                
                $.get(self.UrlPreparacion + 'buscarNombre', {
                    tipo: t,
                    idMaestro: i,
                    nombre: n
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarPreparacion(res);
                    } else {
                        self.solicitarModificarPreparacion(res);
                    }

                }).fail(function(res, status, er) {
                    self.mensajeModalAndGritter({
                        tipo: 'gritter',
                        titulo: 'Problema con la Aplicación',
                        mensaje: 'error: ' + res + ' status: ' + status + ' er: ' + er,
                        clase: 'growl-danger'
                    });
                });
            },
            
            agregarPreparacion: function(res) {
                var self = this;
                var dPrep = new Object();
                var usuario = JSON.parse(sessionStorage.user);
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Preparación Existente.',
                        mensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });

                } else if (!res) {
                    var n = self.$nomPrep.val();
                    var nombre = n.toUpperCase() + " (" + self.$cbxfibraPrep.val() + ")";

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraPrep.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }

                    dPrep.nombMaestro = nombre;
                    dPrep.idFibra = idFib;
                    dPrep.quimicos = new Array();

                    for (var i = 0; i < self.quimicosPorPrep.length; i++) {
                        dPrep.quimicos.push(self.quimicosPorPrep[i]);
                    }

                    $.get(self.UrlPreparacion + 'guardarParaAprobacion', {
                        datos: JSON.stringify(dPrep),
                        idUsuario: usuario.numUsuario

                    }, function(res) {
                        if (res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'Aprobación de Maestro',
                                mensaje: "¡Se ha enviado la solicitud!",
                                clase: ''
                            });

                            self.limpiarFormulario();

                        } else if (!res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'Aprobación de Maestro',
                                mensaje: "¡No se entrego la solicitud!",
                                clase: "growl-danger"
                            });
                        }
                    }).fail(function(res, status, er) {
                        self.mensajeModalAndGritter({
                            tipo: 'gritter',
                            titulo: 'Problema con la Aplicación',
                            mensaje: 'error: ' + res + ' status: ' + status + ' er: ' + er,
                            clase: "growl-danger"
                        });
                    });
                }
            },
            verPreparacion: function() {
                var self = this;

                self.$dataTablePreparacion.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idPreparacion = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomPrep, self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];

                    var datos = {
                        frm: 'prep',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oPreparaciones,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomPrep,
                        eNombreFib: self.$eCbxfibraPrep,
                        eTabla: self.$tBodyEditPrep,
                        eModal: self.$modalEditPrep
                    };
                    
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
                            codQ: self.quimicosPorPrep[i].codQuimico,
                            cantGrLt: self.quimicosPorPrep[i].cantGr,
                            cantPctj: self.quimicosPorPrep[i].cantPtj,
                            cantGrLtNue: -1,
                            cantPctjNue: -1,
                            tipo: ''
                        };
                         self.eQuimicosModif.push(q);
                    }
                    
                    e.stopPropagation();
                });
            },
            
            /*verificarSolicitudes: function() {
                var self = this;
                var elementos = [self.$eNomPrep, self.$eCbxfibraPrep];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },*/
            
            modificarQuimicoPreparacion: function() {
                var self = this;
                
                self.$tBodyEditPrep.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    
                    self.$eCodQuimPrep.val(fila[0].cells[0].textContent);
                    self.$eNomQuimPrep.val(fila[0].cells[1].textContent);
                    self.$eCantGrLtPrep.val(fila[0].cells[2].textContent);
                    self.$eCantPctjPrep.val(fila[0].cells[3].textContent);

                    var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    self.$eCodQuimPrep.attr('disabled', true);
                    self.$eNomQuimPrep.attr('disabled', true);

                    u.camposObligatorios(elementos, '2');
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarPreparacion: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Preparación Existente.',
                        mensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });

                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var dModPrep = new Object();
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    var compos = '';
                    var composNue = '';

                    var coment = self.$eTextArea.val();

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraPrep.val()) {
                            idFibNue = self.oFibras[i].idFibra;
                            composNue = self.oFibras[i].composicion;
                            break;
                        }
                    }

                    for (var i = 0; i < self.oPreparaciones.length; i++) {
                        if (self.idPreparacion === self.oPreparaciones[i].idMaestro) {
                            nombre = um.separarNombreDeFibra({nombre: self.oPreparaciones[i].nombMaestro, fibra: self.oPreparaciones[i].nomFibra});
                            idFib = self.oPreparaciones[i].idFibra;
                            compos = self.oPreparaciones[i].composFibra;
                            var n = self.$eNomPrep.val();
                            
                            if (nombre !== n.toUpperCase()) {
                                nombreNue = n.toUpperCase() + ' (' + self.$eCbxfibraPrep.val() + ')';
                            }

                            if (idFib === idFibNue) {
                                idFibNue = '';
                                composNue = '';
                            }

                            dModPrep.idReg = self.idPreparacion;
                            dModPrep.nombreReg = self.oPreparaciones[i].nombMaestro;
                            dModPrep.nombreRegNue = nombreNue;
                            dModPrep.idFibra = idFib;
                            dModPrep.idFibraNue = idFibNue;
                            dModPrep.idSolicitante = usuario.idUsuario.idPersonal;
                            dModPrep.comentario = coment;
                            dModPrep.quimicoMod = new Array();
                            dModPrep.quimicoNue = new Array();
                            dModPrep.compos = compos;
                            dModPrep.composNue = composNue;

                            for (var i = 0; i < self.eQuimicosModif.length; i++) {
                                if (self.eQuimicosModif[i].tipo !== '') {
                                    dModPrep.quimicoMod.push(self.eQuimicosModif[i]);
                                }
                            }

                            for (var i = 0; i < self.eNuevosQuimicos.length; i++) {
                                dModPrep.quimicoNue.push(self.eNuevosQuimicos[i]);
                            }

                            if (dModPrep.nombreRegNue !== '' || dModPrep.idFibraNue !== '' || dModPrep.quimicoMod.length > 0 || dModPrep.quimicoNue.length > 0) {

                                $.get(self.UrlPreparacion + 'editar', {
                                    datos: JSON.stringify(dModPrep)
                                }, function(res) {

                                    if (res) {
                                        self.mensajeModalAndGritter({
                                            tipo: 'gritter',
                                            titulo: 'Modificar Registro',
                                            mensaje: '¡El maestro ha sido modificado.!',
                                            clase: ''
                                        });

                                        self.$eBtnCerrar.click();

                                        $.get(self.UrlPreparacion + 'maestros', function(data) {
                                            self.cargarDatos(data, 'pr');
                                        });

                                    } else {
                                        self.mensajeModalAndGritter({
                                            tipo: 'gritter',
                                            titulo: 'Modificar Registro',
                                            mensaje: '¡El maestro no se modifico.!',
                                            clase: 'growl-warning'
                                        });
                                    }
                                }).fail(function(response, status, er) {
                                    self.mensajeModalAndGritter({
                                        tipo: 'gritter',
                                        titulo: 'Problema con la Aplicación',
                                        mensaje: 'error: ' + response + ' status: ' + status + ' er: ' + er,
                                        clase: "growl-danger",
                                    });
                                });

                            } else {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: "Modificar Registro",
                                    mensaje: "¡No hay datos a modificar.!",
                                    clase: "growl-warning",
                                });
                            }
                            break;
                        }
                    }
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
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
                });
            }
        };
    })();

    frmPreparacion.init();

})(document, window, jQuery)