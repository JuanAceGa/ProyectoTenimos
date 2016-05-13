(function(document, window, $, undefined) {
    (function() {
        return frmAuxiliar = {
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            UrlProdQuimicos: 'http://localhost:8084/ERPTenimosBackend/rest/productformulacion/',
            UrlAuxiliar: 'http://localhost:8084/ERPTenimosBackend/rest/auxiliar/',
            oFibras: {},
            oQuimicos: {},
            oAuxiliares: {},
            $frmAuxiliar: $('#frmAuxiliar'),
            $dataTableNewQAuxiliar: $('#dataTableNewQAuxiliar'),
            $tBodyNewQAuxiliar: $('#tBodyNewQAuxiliar'),
            $dataTableAuxiliar: $('#dataTableAuxiliar'),
            $nomAux: $('#nomAux'),
            $cbxfibraAux: $('#cbxfibraAux'),
            $codQuimAux: $('#codQuimAux'),
            $nomQuimAux: $('#nomQuimAux'),
            $dlCodQuimAux: $('#dlCodQuimAux'),
            $dlNomQuimAux: $('#dlNomQuimAux'),
            $cantGrLtAux: $('#cantGrLtAux'),
            $cantPctjAux: $('#cantPctjAux'),
            $btnAddLineaAux: $('#btnAddLineaAux'),
            $btnSaveAux: $('#btnSaveAux'),
            $btnCleanAux: $('#btnCleanAux'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditAux: $('#modalEditAuxiliar'),
            $tableEditAux: $('#tableEditAux'),
            $tBodyEditAux: $('#tableEditAux').find('tbody'),
            $eCbxfibraAux: $('#eCbxfibraAux'),
            $eCodQuimAux: $('#eCodQuimAux'),
            $eNomQuimAux: $('#eNomQuimAux'),
            $eNomAux: $('#eNomAux'),
            $eDlCodQuimAux: $('#eDlCodQuimAux'),
            $eDlNomQuimAux: $('#eDlNomQuimAux'),
            $eCantGrLtAux: $('#eCantGrLtAux'),
            $eCantPctjAux: $('#eCantPctjAux'),
            $eTextArea: $('#modalEditAuxiliar').find('textarea'),
            $eBtnAddLineaAux: $('#eBtnAddLineaAux'),
            $eBtnModificar: $('#eBtnEditAux'),
            $eBtnRestAux: $('#eBtnRestAux'),
            $eBtnCerrar: $('#eBtnCerrarModalEditAux'),
            $eBtnCerrar2: $('#modalEditAuxiliar').find('.modal-header .close'),
            quimicosPorAux: [],
            idAuxiliar: 0,
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
                this.agregarLineaAuxiliar();
                this.borrarLineaAuxiliar();
                this.consultaNombreAuxiliar();
                this.verAuxiliar();
                this.modificarQuimicoAuxiliar();
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
                
                $.get(self.UrlAuxiliar + 'maestros', function(data) {
                        self.cargarDatos(data, 'au');
                        
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
                    elementos.push(self.$cbxfibraAux);
                    elementos.push(self.$eCbxfibraAux);
                    um.cargarComboBox(elementos, self.oFibras, 'auxiliares');
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimAux);
                    elementos.push(self.$dlNomQuimAux);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimAux);
                    elementos.push(self.$eDlNomQuimAux);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                }

                if (opc === 'au') {
                    self.oAuxiliares = "";
                    self.oAuxiliares = u.cantidadDecimales(data, 1, '');
                    um.destruirDataTable(self.$dataTableAuxiliar.dataTable(), '2');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTableAuxiliar, self.oAuxiliares, 'aux');
                    self.pintarCamposObligatorios();                    
                }

                /*if (opc === 'nau') {
                    if (data !== null) {
                        self.oAuxiliares = "";
                        self.oAuxiliares = u.cantidadDecimales(data, 1, 'auxiliar');
                        um.destruirDataTable(self.$dataTableAuxiliar.dataTable(), '2');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableAuxiliar, self.oAuxiliares, 'aux');
                        self.pintarCamposObligatorios();
                    }
                }
                
                if (opc === 'solic') {
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

                self.$btnSaveAux.attr('disabled', true);
            },
            
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimAux).on("keyup keypress change", function() {
                    self.$nomQuimAux.val("");
                    var elementos = [self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$codQuimAux.val() === self.oQuimicos[i].codProduct) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
                
                $(self.$nomQuimAux).on('keyup keypress change', function() {
                    self.$codQuimAux.val("");
                    var elementos = [self.$nomQuimAux, self.$codQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$nomQuimAux.val() === self.oQuimicos[i].nomProducto) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
                
                $(self.$eCodQuimAux).on('keyup keypress change', function() {
                    self.$eNomQuimAux.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$eCodQuimAux.val() === self.oQuimicos[i].codProduct) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
                
                $(self.$eNomQuimAux).on('keyup keypress change', function() {
                    self.$eCodQuimAux.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimAux, self.$eCodQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$eNomQuimAux.val() === self.oQuimicos[i].nomProducto) && (self.oQuimicos[i].auxEsp !== true)) {
                            um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                            break;
                        }
                    }
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjAux.inputNumber({
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

                self.$nomAux.focusin(function() {
                    self.$nomAux.css('text-transform', 'uppercase');
                });
                
                self.$nomAux.focusout(function() {
                    u.camposObligatorios([self.$nomAux], '4');
                    
                    (self.$nomAux.val() === '') ? self.$nomAux.css('text-transform', '') : '';
                });
                
                self.$cbxfibraAux.focusout(function () {
                    u.camposObligatorios([self.$cbxfibraAux], '4');
                });
                
                self.$codQuimAux.focusout(function () {
                    u.camposObligatorios([self.$codQuimAux, self.$nomQuimAux], '4');
                });
                
                self.$nomQuimAux.focusin(function() {
                    self.$nomQuimAux.css('text-transform', 'uppercase');
                });
                
                self.$nomQuimAux.focusout(function() {
                    u.camposObligatorios([self.$nomQuimAux, self.$codQuimAux], '4');
                    
                    (self.$nomQuimAux.val() === '') ? self.$nomQuimAux.css('text-transform', '') : '';
                });
                
                self.$cantGrLtAux.focusout(function () {
                    u.camposObligatorios([self.$cantGrLtAux, self.$cantPctjAux], '4');
                });
                
                self.$cantPctjAux.focusout(function () {
                    u.camposObligatorios([self.$cantGrLtAux, self.$cantPctjAux], '4');
                });
                
                self.$eNomAux.focusin(function() {
                    self.$eNomAux.css('text-transform', 'uppercase');
                });
                
                self.$eNomAux.focusout(function() {
                    u.camposObligatorios([self.$eNomAux], '4');
                    
                    (self.$eNomAux.val() === '') ? self.$eNomAux.css('text-transform', '') : '';
                });
                
                self.$eCbxfibraAux.focusout(function() {
                    u.camposObligatorios([self.$eCbxfibraAux], '4');
                });
                
                self.$eCodQuimAux.focusout(function() {
                    u.camposObligatorios([self.$eCodQuimAux, self.$eNomQuimAux], '4');
                });
                
                self.$eNomQuimAux.focusin(function() {
                    self.$eNomQuimAux.css('text-transform', 'uppercase');
                });
                
                self.$eNomQuimAux.focusout(function() {
                    u.camposObligatorios([self.$eNomQuimAux, self.$eCodQuimAux], '4');
                    
                    (self.$eNomQuimAux.val() === '') ? self.$eNomQuimAux.css('text-transform', '') : '';
                });
                
                self.$eCantGrLtAux.focusout(function() {
                    u.camposObligatorios([self.$eCantGrLtAux, self.$eCantPctjAux], '4');
                });
                
                self.$eCantPctjAux.focusout(function() {
                    u.camposObligatorios([self.$eCantGrLtAux, self.$eCantPctjAux], '4');
                });
                
                self.$codQuimAux.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eTextArea.focusout(function(e) {
                    u.camposObligatorios([self.$eTextArea], '4');
                });
                
                self.$eCodQuimAux.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$btnCleanAux.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestAux.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaAux);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraAux.val("Seleccione una...");
                var elementos = [self.$nomAux, self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
                u.limpiarCampos(elementos);

                self.quimicosPorAux = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
                $('#dataTableNewQAuxiliar tr:gt(1)').remove();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomAux, self.$cbxfibraAux, self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
              
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
            
            agregarLineaAuxiliar: function() {
                var self = this;
                
                self.$btnAddLineaAux.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro',
                            mensaje: 'La cantidad debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjAux.val(), input: 'pctj'})) {
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
                            codQuimico: self.$codQuimAux.val(),
                            cantGr: parseFloat(self.$cantGrLtAux.val()),
                            cantPtj: parseFloat(self.$cantPctjAux.val()),
                            maestro: 'aux', 
                            codQpermitido: '1550'},
                            self.quimicosPorAux);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorAux.push({codQuimico: self.$codQuimAux.val(), cantGr: parseFloat(self.$cantGrLtAux.val()), cantPtj: parseFloat(self.$cantPctjAux.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQAuxiliar,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimAux.val(),
                                    nomQuim: self.$nomQuimAux.val(),
                                    cantGrLt: self.$cantGrLtAux.val(),
                                    cantPctj: self.$cantPctjAux.val()});
                            
                            u.limpiarCampos(elementos);
                            u.camposObligatorios(elementos, '4');

                            self.$btnSaveAux.attr('disabled', false);
                        } else {
                            self.mensajeModalAndGritter({
                                tipo: 'modal',
                                titulo: 'Registro de Químicos',
                                mensaje: 'No puede agregar más de una vez un mismo químico.'
                            });
                        }
                    }
                });
                
                self.$eBtnAddLineaAux.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeModalAndGritter({
                            tipo: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro', 
                            mensaje: 'Los gramos debe ser superior a 0.'
                        });

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjAux.val(), input: 'pctj'})) {
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
                            codQuim: self.$eCodQuimAux.val(),
                            nomQuim: self.$eNomQuimAux.val(),
                            cantGrLt: self.$eCantGrLtAux.val(),
                            cantPctj: self.$eCantPctjAux.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditAux;
                            
                            if(parseFloat(self.$eCantGrLtAux.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtAux.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjAux.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimAux.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'aux', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorAux);
                            if (!d.existe) {
                                self.quimicosPorAux.push({codQ: self.$eCodQuimAux.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimAux.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimAux.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtAux.val(),
                                cantPctjNue: self.$eCantPctjAux.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux])
                            self.$eCodQuimAux.attr('disabled', false);
                            self.$eNomQuimAux.attr('disabled', false);
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
            borrarLineaAuxiliar: function() {
                var self = this;
                
                self.$dataTableNewQAuxiliar.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                        
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'aux', 
                        codQpermitido: '1550',
                        pos: (rowIndex - 2)},
                        self.quimicosPorAux); 
                    
                    self.quimicosPorAux = d.oQuim;
                    
                    fila.remove();
                    
                    if ($('#dataTableNewQAuxiliar tbody tr').length - 1 === 0) {
                        self.$btnSaveAux.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditAux.on('click', '#btnDelLinea', function (e){
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
                            maestro: 'aux',
                            codQpermitido: '1550',
                            pos: (rowIndex - 2)},
                        self.quimicosPorAux);
                        
                        self.quimicosPorAux = d.oQuim;
                        
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'aux',
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
                });
            },
            
            consultaNombreAuxiliar: function(){
                var self = this;

                self.$btnSaveAux.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var campos = [self.$nomAux, self.$cbxfibraAux];

                    campOblig = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campOblig) {
                        var n = self.$nomAux.val().trim();
                        self.consultarNombresAuxiliares('nuevo', 0, n.toUpperCase() + ' (' + self.$cbxfibraAux.val() + ')');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    var campObligAux = false;
                    var campos = [self.$eNomAux, self.$eCbxfibraAux, self.$eTextArea];

                    campObligAux = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$eCantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligAux) {
                        var n = self.$eNomAux.val().trim();
                        var nombre = n.toUpperCase();
                        var fibra = self.$eCbxfibraAux.val();
                        
                        for (var i = 0; i < self.oAuxiliares.length; i++) {
                            if (self.idAuxiliar === self.oAuxiliares[i].idMaestro) {
                                var nombreOrg = um.separarNombreDeFibra({nombre: self.oAuxiliares[i].nombMaestro, fibra: self.oAuxiliares[i].nomFibra});

                                self.consultarNombresAuxiliares('editar', self.idAuxiliar, (nombre !== nombreOrg || fibra !== self.oAuxiliares[i].nomFibra) ? nombre + ' (' + fibra + ')' : '');
                                break;
                            }
                        }                 
                    }
                });
            },
            
            consultarNombresAuxiliares: function(t, i, n) {
                var self = this;

                $.get(self.UrlAuxiliar + 'buscarNombre', {
                    tipo: t,
                    idMaestro: i,
                    nombre: n
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarAuxiliar(res);
                    } else {
                        self.solicitarModificarAuxiliar(res);
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
            
            agregarAuxiliar: function(res) {
                var self = this;

                var self = this;
                var dAux = new Object();
                var usuario = JSON.parse(sessionStorage.user);
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Preparación Existente.',
                        mensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });

                } else if (!res) {
                    var n = self.$nomAux.val();
                    var nombre = n.toUpperCase() + " (" + self.$cbxfibraAux.val() + ")";

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraAux.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }

                    dAux.nombMaestro = nombre;
                    dAux.idFibra = idFib;
                    dAux.quimicos = new Array();

                    for (var i = 0; i < self.quimicosPorAux.length; i++) {
                        dAux.quimicos.push(self.quimicosPorAux[i]);
                    }

                    $.get(self.UrlAuxiliar + 'guardarParaAprobacion', {
                        datos: JSON.stringify(dAux),
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
            verAuxiliar: function() {
                var self = this;

                self.$dataTableAuxiliar.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idAuxiliar = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomAux, self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    
                    var datos = {
                        frm: 'aux',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oAuxiliares,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomAux,
                        eNombreFib: self.$eCbxfibraAux,
                        eTabla: self.$tBodyEditAux,
                        eModal: self.$modalEditAux
                    }
                    
                    $("#tableEditAux tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomAux);
                    elementos.push(self.$eCbxfibraAux);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorAux = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorAux.length; i++) {
                        var q = {
                            codQ: self.quimicosPorAux[i].codQ,
                            cantGrLt: self.quimicosPorAux[i].cant1,
                            cantPctj: self.quimicosPorAux[i].cant2,
                            cantGrLtNue: -1,
                            cantPctjNue: -1,
                            tipo: ''
                        };
                         self.eQuimicosModif.push(q);
                    }
                    
                    e.stopPropagation();
                });
                    
            },
            
            modificarQuimicoAuxiliar: function() {
                var self = this;
                
                self.$tBodyEditAux.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    
                    self.$eCodQuimAux.val(fila[0].cells[0].textContent);
                    self.$eNomQuimAux.val(fila[0].cells[1].textContent);
                    self.$eCantGrLtAux.val(fila[0].cells[2].textContent);
                    self.$eCantPctjAux.val(fila[0].cells[3].textContent);

                    var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    self.$eCodQuimAux.attr('disabled', true);
                    self.$eNomQuimAux.attr('disabled', true);

                    u.camposObligatorios(elementos, '2');
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarAuxiliar: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Auxiliar Existente.',
                        mensaje: 'Ya hay un nombre de Auxiliar para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var dModAux = new Object();
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    var compos = '';
                    var composNue = '';

                    var coment = self.$eTextArea.val();

                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraAux.val()) {
                            idFibNue = self.oFibras[i].idFibra;
                            composNue = self.oFibras[i].composicion;
                            break;
                        }
                    }

                    for (var i = 0; i < self.oAuxiliares.length; i++) {
                        if (self.idAuxiliar === self.oAuxiliares[i].idMaestro) {
                            nombre = um.separarNombreDeFibra({nombre: self.oAuxiliares[i].nombMaestro, fibra: self.oAuxiliares[i].nomFibra});
                            idFib = self.oAuxiliares[i].idFibra;
                            compos = self.oAuxiliares[i].composFibra;
                            var n = self.$eNomAux.val();
                            
                            if (nombre !== n.toUpperCase()) {
                                nombreNue = n.toUpperCase() + ' (' + self.$eCbxfibraAux.val() + ')';
                            }

                            if (idFib === idFibNue) {
                                idFibNue = '';
                                composNue = '';
                            }

                            dModAux.idReg = self.idAuxiliar;
                            dModAux.nombreReg = self.oAuxiliares[i].nombMaestro;
                            dModAux.nombreRegNue = nombreNue;
                            dModAux.idFibra = idFib;
                            dModAux.idFibraNue = idFibNue;
                            dModAux.idSolicitante = usuario.idUsuario.idPersonal;
                            dModAux.comentario = coment;
                            dModAux.quimicoMod = new Array();
                            dModAux.quimicoNue = new Array();
                            dModAux.compos = compos;
                            dModAux.composNue = composNue;

                            for (var i = 0; i < self.eQuimicosModif.length; i++) {
                                if (self.eQuimicosModif[i].tipo !== '') {
                                    dModAux.quimicoMod.push(self.eQuimicosModif[i]);
                                }
                            }

                            for (var i = 0; i < self.eNuevosQuimicos.length; i++) {
                                dModAux.quimicoNue.push(self.eNuevosQuimicos[i]);
                            }

                            if (dModAux.nombreRegNue !== '' || dModAux.idFibraNue !== '' || dModAux.quimicoMod.length > 0 || dModAux.quimicoNue.length > 0) {

                                $.get(self.UrlAuxiliar + 'editar', {
                                    datos: JSON.stringify(dModAux)
                                }, function(res) {

                                    if (res) {
                                        self.mensajeModalAndGritter({
                                            tipo: 'gritter',
                                            titulo: 'Modificar Registro',
                                            mensaje: '¡El maestro ha sido modificado.!',
                                            clase: ''
                                        });

                                        self.$eBtnCerrar.click();

                                        $.get(self.UrlAuxiliar + 'maestros', function(data) {
                                            self.cargarDatos(data, 'au');
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

                    if (self.banderaModal === 1 && self.$modalEditAux.is(':hidden')) {
                        self.quimicosPorAux = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$modalEditAux.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditAux.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorAux = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorAux = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorAux = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
            }
        };
    })();

    frmAuxiliar.init();

})(document, window, jQuery)