(function(document, window, $, undefined) {
    (function() {
        return frmProcPos = {
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            UrlProdQuimicos: 'http://localhost:8084/ERPTenimosBackend/rest/productformulacion/',
            UrlProcPos: 'http://localhost:8084/ERPTenimosBackend/rest/procesopost/',
            oFibras: {},
            oQuimicos: {},
            oProcPos: {},
            $frmProcPos: $('#frmProcPos'),
            $dataTableNewQProcPos: $('#dataTableNewQProcPos'),
            $tBodyNewQProcPos: $('#tBodyNewQProcPos'),
            $dataTableProcPos: $('#dataTableProcPos'),
            $nomProcPos: $('#nomProcPos'),
            $cbxfibraProcPos: $('#cbxfibraProcPos'),
            $codQuimProcPos: $('#codQuimProcPos'),
            $nomQuimProcPos: $('#nomQuimProcPos'),
            $dlCodQuimProcPos: $('#dlCodQuimProcPos'),
            $dlNomQuimProcPos: $('#dlNomQuimProcPos'),
            $cantGrLtProcPos: $('#cantGrLtProcPos'),
            $cantPctjProcPos: $('#cantPctjProcPos'),
            $btnAddLineaProcPos: $('#btnAddLineaProcPos'),
            $btnSaveProcPos: $('#btnSaveProcPos'),
            $btnCleanProcPos: $('#btnCleanProcPos'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditProcPos: $('#modalEditProcPos'),
            $tableEditProcPos: $('#tableEditProcPos'),
            $tBodyEditProcPos: $('#tableEditProcPos').find('tbody'),
            $eCbxfibraProcPos: $('#eCbxfibraProcPos'),
            $eCodQuimProcPos: $('#eCodQuimProcPos'),
            $eNomQuimProcPos: $('#eNomQuimProcPos'),
            $eNomProcPos: $('#eNomProcPos'),
            $eDlCodQuimProcPos: $('#eDlCodQuimProcPos'),
            $eDlNomQuimProcPos: $('#eDlNomQuimProcPos'),
            $eCantGrLtProcPos: $('#eCantGrLtProcPos'),
            $eCantPctjProcPos: $('#eCantPctjProcPos'),
            $eTextArea: $('#modalEditProcPos').find('textarea'),
            $eBtnAddLineaProcPos: $('#eBtnAddLineaProcPos'),
            $eBtnModificar: $('#eBtnEditProcPos'),
            $eBtnRestProcPos: $('#eBtnRestProcPos'),
            $eBtnCerrar: $('#eBtnCerrarModalEditProcPost'),
            $eBtnCerrar2: $('#modalEditProcPos').find('.modal-header .close'),
            quimicosPorProcPos: [],
            idProcPos: 0,
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
                this.agregarLineaProcPos();
                this.borrarLineaProcPos();
                this.consultaNombreProcPos();
                this.verProcPos();
                this.modificarQuimicoProcPos();
                this.cerrarModalEdicion();
            },            
            consultas: function() {
                var self = this;
                
                $.get(self.UrlFibras + 'listadoFibras', function(data) {
                    self.cargarDatos(data, 'f');
                    
                }).fail(function(res, status, er){
                    self.mensajeModalAndGritter({
                       tipo: 'gritter',
                       titulo: 'Servicio',
                       mensaje: 'error: ' + res + ' status: ' + status + ' er: ' + er,
                       clase: 'growl-danger'
                    });                    
                });
                
                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    self.cargarDatos(data, 'q');
                    
                }).fail(function(res, status, er){
                    self.mensajeModalAndGritter({
                       tipo: 'gritter',
                       titulo: 'Servicio',
                       mensaje: 'error: ' + res + ' status: ' + status + ' er: ' + er,
                       clase: 'growl-danger'
                    });                    
                });
                
                $.get(self.UrlProcPos + 'maestros', function(data) {
                    self.cargarDatos(data, 'pp');
                        
                }).fail(function(res, status, er){
                    self.mensajeModalAndGritter({
                       tipo: 'gritter',
                       titulo: 'Servicio',
                       mensaje: 'error: ' + res + ' status: ' + status + ' er: ' + er,
                       clase: 'growl-danger'
                    });                    
                });
            },
            cargarDatos: function(data, opc) {
                var self = this;
                var elementos = [];
                
                if (opc === 'f') {
                    self.oFibras = data;
                    
                    elementos.push(self.$cbxfibraProcPos);
                    elementos.push(self.$eCbxfibraProcPos);
                    um.cargarComboBox(elementos, self.oFibras, 'proPost');
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimProcPos);
                    elementos.push(self.$dlNomQuimProcPos);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimProcPos);
                    elementos.push(self.$eDlNomQuimProcPos);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                }

                if (opc === 'pp') {
                    self.oProcPos = "";
                    self.oProcPos = u.cantidadDecimales(data, 1, '');
                    um.destruirDataTable(self.$dataTableProcPos.dataTable(), '');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTableProcPos, self.oProcPos, 'pp');
                    self.pintarCamposObligatorios();    
                }
            },
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSaveProcPos.attr('disabled', true);
            },
            coincidenciaQuimico: function() {
                var self = this;                
                
                $(self.$codQuimProcPos).on("keyup keypress change", function() {
                    self.$nomQuimProcPos.val("");
                    var elementos = [self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$codQuimProcPos.val() === self.oQuimicos[i].codProduct) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
                
                $(self.$nomQuimProcPos).on('keyup keypress change', function() {
                    self.$codQuimProcPos.val("");
                    var elementos = [self.$nomQuimProcPos, self.$codQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$nomQuimProcPos.val() === self.oQuimicos[i].nomProducto) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });

                $(self.$eCodQuimProcPos).on('keyup keypress change', function() {
                    self.$eNomQuimProcPos.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$eCodQuimProcPos.val() === self.oQuimicos[i].codProduct) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
                
                $(self.$eNomQuimProcPos).on('keyup keypress change', function() {
                    self.$eCodQuimProcPos.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimProcPos, self.$eCodQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$eNomQuimProcPos.val() === self.oQuimicos[i].nomProducto) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjProcPos.inputNumber({
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

                self.$nomProcPos.on('keyup keypress', function() {
                    self.$nomProcPos.val(self.$nomProcPos.val().toUpperCase());
                });

                self.$nomQuimProcPos.on('keyup keypress', function() {
                    self.$nomQuimProcPos.val(self.$nomQuimProcPos.val().toUpperCase());
                });

                self.$eNomProcPos.on('keyup keypress', function() {
                    self.$eNomProcPos.val(self.$eNomProcPos.val().toUpperCase());
                });

                self.$eNomQuimProcPos.on('keyup keypress', function() {
                    self.$eNomQuimProcPos.val(self.$eNomQuimProcPos.val().toUpperCase());
                });

                self.$codQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanProcPos.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestProcPos.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaProcPos);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });
                
                
                self.$nomProcPos.focusin(function() {
                    self.$nomProcPos.css('text-transform', 'uppercase');
                });
                
                self.$nomProcPos.focusout(function() {
                    u.camposObligatorios([self.$nomProcPos], '4');
                    
                    (self.$nomProcPos.val() === '') ? self.$nomProcPos.css('text-transform', '') : '';
                });
                
                self.$cbxfibraProcPos.focusout(function () {
                    u.camposObligatorios([self.$cbxfibraProcPos], '4');
                });
                
                self.$codQuimProcPos.focusout(function () {
                    u.camposObligatorios([self.$codQuimProcPos, self.$nomQuimProcPos], '4');
                });
                
                self.$nomQuimProcPos.focusin(function() {
                    self.$nomQuimProcPos.css('text-transform', 'uppercase');
                });
                
                self.$nomQuimProcPos.focusout(function() {
                    u.camposObligatorios([self.$nomQuimProcPos, self.$codQuimProcPos], '4');
                    
                    (self.$nomQuimProcPos.val() === '') ? self.$nomQuimProcPos.css('text-transform', '') : '';
                });
                
                self.$cantGrLtProcPos.focusout(function () {
                    u.camposObligatorios([self.$cantGrLtProcPos, self.$cantPctjProcPos], '4');
                });
                
                self.$cantPctjProcPos.focusout(function () {
                    u.camposObligatorios([self.$cantGrLtProcPos, self.$cantPctjProcPos], '4');
                });
                
                self.$eNomProcPos.focusin(function() {
                    self.$eNomProcPos.css('text-transform', 'uppercase');
                });
                
                self.$eNomProcPos.focusout(function() {
                    u.camposObligatorios([self.$eNomProcPos], '4');
                    
                    (self.$eNomProcPos.val() === '') ? self.$eNomProcPos.css('text-transform', '') : '';
                });
                
                self.$eCbxfibraProcPos.focusout(function() {
                    u.camposObligatorios([self.$eCbxfibraProcPos], '4');
                });
                
                self.$eCodQuimProcPos.focusout(function() {
                    u.camposObligatorios([self.$eCodQuimProcPos, self.$eNomQuimProcPos], '4');
                });
                
                self.$eNomQuimProcPos.focusin(function() {
                    self.$eNomQuimProcPos.css('text-transform', 'uppercase');
                });
                
                self.$eNomQuimProcPos.focusout(function() {
                    u.camposObligatorios([self.$eNomQuimProcPos, self.$eCodQuimProcPos], '4');
                    
                    (self.$eNomQuimProcPos.val() === '') ? self.$eNomQuimProcPos.css('text-transform', '') : '';
                });
                
                self.$eCantGrLtProcPos.focusout(function() {
                    u.camposObligatorios([self.$eCantGrLtProcPos, self.$eCantPctjProcPos], '4');
                });
                
                self.$eCantPctjProcPos.focusout(function() {
                    u.camposObligatorios([self.$eCantGrLtProcPos, self.$eCantPctjProcPos], '4');
                });
                
                self.$codQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eTextArea.focusout(function(e) {
                    u.camposObligatorios([self.$eTextArea], '4');
                });
                
                self.$eCodQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$btnCleanProcPos.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestProcPos.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaProcPos);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraProcPos.val("Seleccione una...");
                var elementos = [self.$nomProcPos, self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
                u.limpiarCampos(elementos);

                self.quimicosPorProcPos = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
                $('#dataTableNewQProcPos tr:gt(1)').remove();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomProcPos, self.$cbxfibraProcPos, self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
              
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
            
            agregarLineaProcPos: function() {
                var self = this;
                
                self.$btnAddLineaProcPos.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro',
                            mensaje: 'La cantidad debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjProcPos.val(), input: 'pctj'})) {
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
                            codQuimico: self.$codQuimProcPos.val(),
                            cantGr: parseFloat(self.$cantGrLtProcPos.val()),
                            cantPtj: parseFloat(self.$cantPctjProcPos.val()),
                            maestro: 'pp', 
                            codQpermitido: '1550'},
                            self.quimicosPorProcPos);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorProcPos.push({codQuimico: self.$codQuimProcPos.val(), cantGr: parseFloat(self.$cantGrLtProcPos.val()), cantPtj: parseFloat(self.$cantPctjProcPos.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQProcPos,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimProcPos.val(),
                                    nomQuim: self.$nomQuimProcPos.val(),
                                    cantGrLt: self.$cantGrLtProcPos.val(),
                                    cantPctj: self.$cantPctjProcPos.val()});
                            
                            u.limpiarCampos(elementos);
                            u.camposObligatorios(elementos, '4');

                            self.$btnSaveProcPos.attr('disabled', false);
                        } else {
                            self.mensajeModalAndGritter({
                                tipo: 'modal',
                                titulo: 'Registro de Químicos',
                                mensaje: 'No puede agregar más de una vez un mismo químico.'
                            });
                        }
                    }
                });
                
                self.$eBtnAddLineaProcPos.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro', 
                            mensaje: 'Los gramos debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            mensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'
                        });
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$eCodQuimProcPos.val(),
                            nomQuim: self.$eNomQuimProcPos.val(),
                            cantGrLt: self.$eCantGrLtProcPos.val(),
                            cantPctj: self.$eCantPctjProcPos.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditProcPos;
                            
                            if(parseFloat(self.$eCantGrLtProcPos.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtProcPos.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjProcPos.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimProcPos.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'pp', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorProcPos);
                            if (!d.existe) {
                                self.quimicosPorProcPos.push({codQ: self.$eCodQuimProcPos.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimProcPos.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimProcPos.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtProcPos.val(),
                                cantPctjNue: self.$eCantPctjProcPos.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos])
                            self.$eCodQuimProcPos.attr('disabled', false);
                            self.$eNomQuimProcPos.attr('disabled', false);
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
            borrarLineaProcPos: function() {
                var self = this;
                
                self.$dataTableNewQProcPos.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                        
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'pp', 
                        codQpermitido: '1550',
                        pos: (rowIndex - 2)},
                        self.quimicosPorProcPos); 
                    
                    self.quimicosPorProcPos = d.oQuim;
                    
                    fila.remove();
                    
                    if ($('#dataTableNewQProcPos tbody tr').length - 1 === 0) {
                        self.$btnSaveProcPos.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditProcPos.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;
                    
                    var posN = ((rowIndex - 2) - (self.quimicosPorProcPos.length - self.eNuevosQuimicos.length));

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'pp',
                        codQpermitido: '1550',
                        pos: (rowIndex - 2)},
                    self.quimicosPorProcPos);

                    self.quimicosPorProcPos = d.oQuim;

                    d = um.noRepetirQuimicos({
                        tipo: '-',
                        codQ: codigo,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'pp',
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
                    
                    e.stopPropagation();
                });
            },
            
            consultaNombreProcPos: function(){
                var self = this;

                self.$btnSaveProcPos.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var campos = [self.$nomProcPos, self.$cbxfibraProcPos];

                    campOblig = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campOblig) {
                        var n = self.$nomProcPos.val().trim();
                        self.consultarNombresProcPos('nuevo', 0, n.toUpperCase() + " (" + self.$cbxfibraProcPos.val() + ")");
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    var campObligProcPos = false;
                    var campos = [self.$eNomProcPos, self.$eCbxfibraProcPos, self.$eTextArea];

                    campObligProcPos = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$eCantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligProcPos) {
                        var n = self.$eNomProcPos.val().trim();
                        var nombre = n.toUpperCase();
                        var fibra = self.$eCbxfibraProcPos.val();
                        
                        for (var i = 0; i < self.oProcPos.length; i++) {
                            if (self.idProcPos === self.oProcPos[i].idMaestro){
                                var nombreOrg = um.separarNombreDeFibra({nombre: self.oProcPos[i].nombMaestro, fibra: self.oProcPos[i].nomFibra});

                                self.consultarNombresProcPos('editar', self.idProcPos, (nombre !== nombreOrg || fibra !== self.oProcPos[i].nomFibra) ? nombre + ' (' + fibra + ')' : '');
                                break;
                            }
                        }
                    }
                });
            },
            
            consultarNombresProcPos: function(t, i, n) {
                var self = this;

                $.get(self.UrlProcPos + 'buscarNombre', {
                    tipo: t,
                    idMaestro: i,
                    nombre: n
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarProcPos(res);
                    } else {
                        self.solicitarModificarProcPos(res);
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
            
            agregarProcPos: function(res) {
                var self = this;                
                var dProcP = new Object();
                var usuario = JSON.parse(sessionStorage.user);

                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Proceso Posterior Existente.',
                        mensaje: 'Ya hay un nombre de proceso posterior para la fibra seleccionada, por favor intente nuevamente.'
                    });

                } else if (!res) {
                    var n = self.$nomProcPos.val();
                    var nombre = n.toUpperCase() + " (" + self.$cbxfibraProcPos.val() + ")";

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraProcPos.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }

                    dProcP.nombMaestro = nombre;
                    dProcP.idFibra = idFib;
                    dProcP.quimicos = new Array();

                    for (var i = 0; i < self.quimicosPorProcPos.length; i++) {
                        dProcP.quimicos.push(self.quimicosPorProcPos[i]);
                    }

                    $.get(self.UrlProcPos + 'guardarParaAprobacion', {
                        datos: JSON.stringify(dProcP),
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
            verProcPos: function() {
                var self = this;

                self.$dataTableProcPos.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idProcPos = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomProcPos, self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    
                    var datos = {
                        frm: 'pp',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oProcPos,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomProcPos,
                        eNombreFib: self.$eCbxfibraProcPos,
                        eTabla: self.$tBodyEditProcPos,
                        eModal: self.$modalEditProcPos
                    };
                    
                    $("#tableEditProcPos tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomProcPos);
                    elementos.push(self.$eCbxfibraProcPos);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorProcPos = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorProcPos.length; i++) {
                        var q = {
                            codQ: self.quimicosPorProcPos[i].codQuimico,
                            cantGrLt: self.quimicosPorProcPos[i].cantGr,
                            cantPctj: self.quimicosPorProcPos[i].cantPtj,
                            cantGrLtNue: -1,
                            cantPctjNue: -1,
                            tipo: ''
                        };
                         self.eQuimicosModif.push(q);
                    }
                    
                    e.stopPropagation();
                });
                    
            },
            
            modificarQuimicoProcPos: function() {
                var self = this;
                
                self.$tBodyEditProcPos.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    
                    self.$eCodQuimProcPos.val(fila[0].cells[0].textContent);
                    self.$eNomQuimProcPos.val(fila[0].cells[1].textContent);
                    self.$eCantGrLtProcPos.val(fila[0].cells[2].textContent);
                    self.$eCantPctjProcPos.val(fila[0].cells[3].textContent);

                    var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    self.$eCodQuimProcPos.attr('disabled', true);
                    self.$eNomQuimProcPos.attr('disabled', true);

                    u.camposObligatorios(elementos, '2');
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarProcPos: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Proceso Posterior Existente.',
                        mensaje: 'Ya hay un nombre de Proceso Posterior para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var dModProcP = new Object();
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    var compos = '';
                    var composNue = '';

                    var coment = self.$eTextArea.val();

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraProcPos.val()) {
                            idFibNue = self.oFibras[i].idFibra;
                            composNue = self.oFibras[i].composicion;
                            break;
                        }
                    }

                    for (var i = 0; i < self.oProcPos.length; i++) {
                        if (self.idProcPos === self.oProcPos[i].idMaestro) {
                            nombre = um.separarNombreDeFibra({nombre: self.oProcPos[i].nombMaestro, fibra: self.oProcPos[i].nomFibra});
                            idFib = self.oProcPos[i].idFibra;
                            compos = self.oProcPos[i].composFibra;
                            var n = self.$eNomProcPos.val().trim();
                            
                            if (nombre !== n.toUpperCase()) {
                                nombreNue = n.toUpperCase() + ' (' + self.$eCbxfibraProcPos.val() + ')';
                            }

                            if (idFib === idFibNue) {
                                idFibNue = '';
                                composNue = '';
                            }

                            dModProcP.idReg = self.idProcPos;
                            dModProcP.nombreReg = self.oProcPos[i].nombMaestro;
                            dModProcP.nombreRegNue = nombreNue;
                            dModProcP.idFibra = idFib;
                            dModProcP.idFibraNue = idFibNue;
                            dModProcP.idSolicitante = usuario.idUsuario.idPersonal;
                            dModProcP.comentario = coment;
                            dModProcP.quimicoMod = new Array();
                            dModProcP.quimicoNue = new Array();
                            dModProcP.compos = compos;
                            dModProcP.composNue = composNue;

                            for (var i = 0; i < self.eQuimicosModif.length; i++) {
                                if (self.eQuimicosModif[i].tipo !== '') {
                                    dModProcP.quimicoMod.push(self.eQuimicosModif[i]);
                                }
                            }

                            for (var i = 0; i < self.eNuevosQuimicos.length; i++) {
                                dModProcP.quimicoNue.push(self.eNuevosQuimicos[i]);
                            }

                            if (dModProcP.nombreRegNue !== '' || dModProcP.idFibraNue !== '' || dModProcP.quimicoMod.length > 0 || dModProcP.quimicoNue.length > 0) {

                                $.get(self.UrlProcPos + 'editar', {
                                    datos: JSON.stringify(dModProcP)
                                }, function(res) {

                                    if (res) {
                                        self.mensajeModalAndGritter({
                                            tipo: 'gritter',
                                            titulo: 'Modificar Registro',
                                            mensaje: '¡El maestro ha sido modificado.!',
                                            clase: ''
                                        });

                                        self.$eBtnCerrar.click();

                                        $.get(self.UrlProcPos + 'maestros', function(data) {
                                            self.cargarDatos(data, 'pp');
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

                    if (self.banderaModal === 1 && self.$modalEditProcPos.is(':hidden')) {
                        self.quimicosPorProcPos = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$modalEditProcPos.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditProcPos.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorProcPos = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorProcPos = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorProcPos = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
            }
        };
    })();

    frmProcPos.init();

})(document, window, jQuery)